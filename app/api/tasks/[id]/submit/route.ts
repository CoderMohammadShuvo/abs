import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/lib/api-response'

interface RouteParams {
    params: Promise<{
        id: string // Task ID
    }>
}

const submitSchema = z.object({
    url: z.string().url(),
    type: z.enum(['DOC', 'PDF', 'IMAGE', 'ZIP', 'OTHER']).optional().default('DOC'), // Simplified mapping to MediaType
    fileName: z.string().optional()
})

// POST - Upload work (Create Media linked to Task)
export async function POST(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireAuth(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params
        const body = await request.json()

        const validation = submitSchema.safeParse(body)
        if (!validation.success) {
            return validationErrorResponse({ url: 'Invalid URL' })
        }

        const { url, type } = validation.data

        const task = await prisma.task.findUnique({
            where: { id },
            include: { assignments: true }
        })

        if (!task || task.deletedAt) {
            return notFoundResponse('Task not found')
        }

        const isAssigned = task.assignments.some(a => a.userId === authResult.user.userId)
        if (!isAssigned) {
            return errorResponse('Access denied', 403)
        }

        // Map type to MediaType if needed, for now defaulting or strict
        // Schema MediaType: VIDEO, PDF, IMAGE, DOC, XLS, CSV, NOTE
        // We'll trust input or map 'ZIP' -> 'DOC' for now?
        // Let's assume input maps correctly to schema enum or fallback
        let mediaType: any = type
        if (type === 'ZIP' || type === 'OTHER') mediaType = 'DOC'

        const media = await prisma.media.create({
            data: {
                url,
                type: mediaType,
                taskId: id,
                ownerId: id,
                ownerType: 'TASK',
                uploadedById: authResult.user.userId,
                isPublic: false
            }
        })

        // Optionally update task status to IN_PROGRESS or COMPLETED?

        return successResponse(media, 'Work submitted successfully', 201)
    } catch (error) {
        console.error('Submit work error:', error)
        return errorResponse('Failed to submit work', 500)
    }
}
