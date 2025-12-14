import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { verifyPassword } from '@/lib/password'
import { generateToken } from '@/lib/jwt'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response'

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required')
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validate input
        const validation = loginSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const { email, password } = validation.data

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                profile: true
            }
        })

        if (!user) {
            return errorResponse('Invalid email or password', 401)
        }

        // Check if user is active
        if (!user.isActive) {
            return errorResponse('Account is inactive. Please contact support.', 403)
        }

        // Verify password
        const isPasswordValid = await verifyPassword(password, user.passwordHash)
        if (!isPasswordValid) {
            return errorResponse('Invalid email or password', 401)
        }

        // Update last login
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() }
        })

        // Generate JWT token
        const token = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role
        })

        // Remove password hash from response
        const { passwordHash: _, ...userWithoutPassword } = user

        return successResponse({
            user: userWithoutPassword,
            token
        }, 'Login successful')
    } catch (error) {
        console.error('Login error:', error)
        return errorResponse('Login failed', 500)
    }
}
