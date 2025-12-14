import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-middleware'
import { successResponse, errorResponse } from '@/lib/api-response'

export async function GET(request: NextRequest) {
    try {
        const authResult = requireAuth(request)

        if (authResult instanceof Response) {
            return authResult
        }

        const { user: tokenUser } = authResult

        // Fetch full user data
        const user = await prisma.user.findUnique({
            where: { id: tokenUser.userId },
            include: {
                profile: true
            }
        })

        if (!user) {
            return errorResponse('User not found', 404)
        }

        // Remove password hash from response
        const { passwordHash: _, ...userWithoutPassword } = user

        return successResponse(userWithoutPassword)
    } catch (error) {
        console.error('Get current user error:', error)
        return errorResponse('Failed to fetch user data', 500)
    }
}
