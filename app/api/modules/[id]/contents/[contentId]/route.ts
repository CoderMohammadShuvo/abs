import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

interface RouteParams {
    params: Promise<{
        id: string
        contentId: string
    }>
}

const updateContentSchema = z.object({
    title: z.string().min(3).optional(),
    description: z.string().optional(),
    type: z.enum(['VIDEO', 'PDF', 'QUIZ', 'LIVE_CLASS', 'NOTE']).optional(),
    url: z.string().optional(),
    duration: z.number().optional(),
    isFree: z.boolean().optional(),
    isLive: z.boolean().optional(),
    liveUrl: z.string().optional()
})

// PUT - Update content
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireRole(request, [UserRole.TEACHER, UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) {
            return authResult
        }

        const { id, contentId } = await params
        const body = await request.json()

        const validation = updateContentSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const content = await prisma.courseContent.findUnique({
            where: { id: contentId },
            include: { module: { include: { course: true } } }
        })

        if (!content) {
            return notFoundResponse('Content not found')
        }

        if (authResult.user.role === UserRole.TEACHER && content.module.course.teacherId !== authResult.user.userId) {
            return errorResponse('You can only update content of your own courses', 403)
        }

        const updatedContent = await prisma.courseContent.update({
            where: { id: contentId },
            data: validation.data
        })

        return successResponse(updatedContent, 'Content updated successfully')

    } catch (error) {
        console.error('Update content error:', error)
        return errorResponse('Failed to update content', 500)
    }
}

// DELETE - Delete content
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireRole(request, [UserRole.TEACHER, UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) {
            return authResult
        }

        const { id, contentId } = await params

        const content = await prisma.courseContent.findUnique({
            where: { id: contentId },
            include: { module: { include: { course: true } } }
        })

        if (!content) {
            return notFoundResponse('Content not found')
        }

        if (authResult.user.role === UserRole.TEACHER && content.module.course.teacherId !== authResult.user.userId) {
            return errorResponse('You can only delete content of your own courses', 403)
        }

        await prisma.courseContent.delete({
            where: { id: contentId }
        })

        return successResponse(null, 'Content deleted successfully')

    } catch (error) {
        console.error('Delete content error:', error)
        return errorResponse('Failed to delete content', 500)
    }
}
