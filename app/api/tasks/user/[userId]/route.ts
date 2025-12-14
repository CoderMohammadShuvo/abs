import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-middleware'
import { successResponse, errorResponse } from '@/lib/api-response'

interface RouteParams {
    params: Promise<{
        userId: string
    }>
}

// GET - Get user's assigned tasks
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireAuth(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { userId } = await params

        // Check permission (Own tasks or Admin)
        if (userId !== authResult.user.userId && authResult.user.role !== 'ADMIN' && authResult.user.role !== 'SUPER_ADMIN') {
            return errorResponse('Access denied', 403)
        }

        const tasks = await prisma.task.findMany({
            where: {
                deletedAt: null,
                assignments: {
                    some: { userId }
                }
            },
            include: {
                project: {
                    select: { title: true, id: true }
                },
                assignments: {
                    where: { userId },
                    select: { statusChangeAt: true } // just some data ?
                }
            },
            orderBy: { dueAt: 'asc' }
        })

        return successResponse({ tasks })
    } catch (error) {
        console.error('List user tasks error:', error)
        return errorResponse('Failed to fetch user tasks', 500)
    }
}
