import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/lib/api-response'
import { TaskStatus } from '@prisma/client'

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

const updateStatusSchema = z.object({
    status: z.nativeEnum(TaskStatus)
})

export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireAuth(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params
        const body = await request.json()

        const validation = updateStatusSchema.safeParse(body)
        if (!validation.success) {
            return validationErrorResponse({ status: 'Invalid status' })
        }

        const { status } = validation.data

        const task = await prisma.task.findUnique({
            where: { id },
            include: { assignments: true }
        })

        if (!task || task.deletedAt) {
            return notFoundResponse('Task not found')
        }

        // Verify assignment
        const isAssigned = task.assignments.some(a => a.userId === authResult.user.userId)
        if (!isAssigned && authResult.user.role !== 'ADMIN' && authResult.user.role !== 'SUPER_ADMIN') {
            return errorResponse('Access denied', 403)
        }

        const updatedTask = await prisma.task.update({
            where: { id },
            data: {
                status,
                completedAt: status === 'COMPLETED' ? new Date() : null,
                // Track status changes in assignments or audit log if needed?
                // Schema has statusChangeAt in TaskAssignment but it's per user?
                // For now updating main task status
            }
        })

        return successResponse(updatedTask, 'Status updated successfully')
    } catch (error) {
        console.error('Update status error:', error)
        return errorResponse('Failed to update status', 500)
    }
}
