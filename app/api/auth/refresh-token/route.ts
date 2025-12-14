import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { generateToken, verifyToken } from '@/lib/jwt'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response'

// In a real implementation, we would verify a refresh token from the database
// For this simplified version, we'll just verify the existing token and issue a new one if it's valid
// or close to expiry.

const refreshTokenSchema = z.object({
    token: z.string().min(1, 'Token is required')
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const validation = refreshTokenSchema.safeParse(body)
        if (!validation.success) {
            return validationErrorResponse({ token: 'Token is required' })
        }

        const { token } = validation.data

        // Verify the existing token
        const payload = await verifyToken(token)
        if (!payload) {
            return errorResponse('Invalid or expired token', 401)
        }

        // Check if user still exists and is active
        const user = await prisma.user.findUnique({
            where: { id: payload.userId }
        })

        if (!user || !user.isActive) {
            return errorResponse('User not found or inactive', 401)
        }

        // Generate new token
        const newToken = await generateToken({
            userId: user.id,
            email: user.email,
            role: user.role
        })

        return successResponse({ token: newToken }, 'Token refreshed successfully')
    } catch (error) {
        console.error('Refresh token error:', error)
        return errorResponse('Failed to refresh token', 500)
    }
}
