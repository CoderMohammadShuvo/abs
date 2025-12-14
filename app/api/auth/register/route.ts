import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { hashPassword, validatePasswordStrength } from '@/lib/password'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response'

const registerSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    role: z.enum(['STUDENT', 'TEACHER']).optional().default('STUDENT')
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validate input
        const validation = registerSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const { email, password, fullName, role } = validation.data

        // Validate password strength
        const passwordValidation = validatePasswordStrength(password)
        if (!passwordValidation.valid) {
            return errorResponse(passwordValidation.message || 'Invalid password')
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return errorResponse('User with this email already exists', 409)
        }

        // Hash password
        const passwordHash = await hashPassword(password)

        // Generate unique userId
        const userId = `USR-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`

        // Create user and profile in a transaction
        const user = await prisma.user.create({
            data: {
                userId,
                email,
                passwordHash,
                role: role as any,
                profile: {
                    create: {
                        fullName,
                        status: 'active'
                    }
                }
            },
            include: {
                profile: true
            }
        })

        // Remove password hash from response
        const { passwordHash: _, ...userWithoutPassword } = user

        return successResponse(
            userWithoutPassword,
            'Registration successful',
            201
        )
    } catch (error) {
        console.error('Registration error:', error)
        return errorResponse('Registration failed', 500)
    }
}
