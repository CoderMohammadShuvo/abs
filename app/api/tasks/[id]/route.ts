import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api-response'

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

// GET - Get task details
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireAuth(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params

        const task = await prisma.task.findUnique({
            where: { id },
            include: {
                project: {
                    select: { title: true }
                },
                assignments: {
                    include: {
                        user: {
                            select: {
                                email: true,
                                profile: { select: { fullName: true, avatarUrl: true } }
                            }
                        }
                    }
                },
                media: true // Submissions/Files
            }
        })

        if (!task || task.deletedAt) {
            return notFoundResponse('Task not found')
        }

        // Check if user is assigned or is admin
        const isAssigned = task.assignments.some(a => a.userId === authResult.user.userId)
        const isAdmin = authResult.user.role === 'ADMIN' || authResult.user.role === 'SUPER_ADMIN'

        if (!isAssigned && !isAdmin) {
            // Use simple check. Project owner/creator should also have access?
            return errorResponse('Access denied', 403)
        }

        return successResponse(task)
    } catch (error) {
        console.error('Get task error:', error)
        return errorResponse('Failed to fetch task', 500)
    }
}
