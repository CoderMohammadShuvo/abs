import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

const feedbackSchema = z.object({
    comment: z.string().min(1),
    rating: z.number().min(1).max(5).optional()
})

// POST - Add feedback
export async function POST(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireRole(request, [UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.TEACHER])
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params
        const body = await request.json()

        const validation = feedbackSchema.safeParse(body)
        if (!validation.success) {
            return validationErrorResponse({ comment: 'Comment is required' })
        }

        const { comment, rating } = validation.data

        const task = await prisma.task.findUnique({
            where: { id }
        })

        if (!task || task.deletedAt) {
            return notFoundResponse('Task not found')
        }

        // Append feedback to Json
        // We assume feedback is an array of objects in the Json
        const existingFeedback = (task.feedback as any[]) || []
        const newFeedback = {
            userId: authResult.user.userId,
            comment,
            rating,
            createdAt: new Date().toISOString()
        }

        const updatedTask = await prisma.task.update({
            where: { id },
            data: {
                feedback: [...existingFeedback, newFeedback]
            }
        })

        return successResponse(updatedTask, 'Feedback added successfully')
    } catch (error) {
        console.error('Add feedback error:', error)
        return errorResponse('Failed to add feedback', 500)
    }
}
