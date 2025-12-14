import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { hashPassword, verifyPassword, validatePasswordStrength } from '@/lib/password'
import { requireAuth } from '@/lib/auth-middleware'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response'

const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
    confirmNewPassword: z.string().min(1, 'Please confirm new password')
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"]
})

export async function PUT(request: NextRequest) {
    try {
        const authResult = requireAuth(request)
        if (authResult instanceof Response) return authResult

        const body = await request.json()

        const validation = changePasswordSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const { currentPassword, newPassword } = validation.data
        const userId = authResult.user.userId

        // Get user to verify current password
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!user) return errorResponse('User not found', 404)

        // Verify current password
        const isPasswordValid = await verifyPassword(currentPassword, user.passwordHash)
        if (!isPasswordValid) {
            return errorResponse('Incorrect current password', 400)
        }

        // Validate new password strength
        const strength = validatePasswordStrength(newPassword)
        if (!strength.valid) {
            return errorResponse(strength.message || 'Weak password', 400)
        }

        // Hash new password
        const passwordHash = await hashPassword(newPassword)

        // Update password
        await prisma.user.update({
            where: { id: userId },
            data: {
                passwordHash,
                lastPasswordChange: new Date()
            }
        })

        return successResponse(null, 'Password changed successfully')
    } catch (error) {
        console.error('Change password error:', error)
        return errorResponse('Failed to change password', 500)
    }
}
