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

const addContentSchema = z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    type: z.enum(['VIDEO', 'PDF', 'QUIZ', 'LIVE_CLASS', 'NOTE']),
    url: z.string().optional(),
    duration: z.number().optional(),
    isFree: z.boolean().optional(),
    isLive: z.boolean().optional(),
    liveUrl: z.string().optional()
})

// POST - Add content to module
export async function POST(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireRole(request, [UserRole.TEACHER, UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params
        const body = await request.json()

        const validation = addContentSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const data = validation.data

        const module = await prisma.courseModule.findUnique({
            where: { id },
            include: { course: true }
        })

        if (!module) {
            return notFoundResponse('Module not found')
        }

        // Check ownership
        if (authResult.user.role === UserRole.TEACHER && module.course.teacherId !== authResult.user.userId) {
            return errorResponse('You can only add content to your own courses', 403)
        }

        // Get max order
        const lastContent = await prisma.courseContent.findFirst({
            where: { moduleId: id },
            orderBy: { order: 'desc' }
        })
        const newOrder = lastContent ? lastContent.order + 1 : 1

        const content = await prisma.courseContent.create({
            data: {
                moduleId: id,
                title: data.title,
                description: data.description,
                type: data.type,
                url: data.url,
                duration: data.duration,
                isFree: data.isFree ?? false,
                isLive: data.isLive ?? false,
                liveUrl: data.liveUrl,
                order: newOrder
            }
        })

        return successResponse(content, 'Content added successfully', 201)

    } catch (error) {
        console.error('Add content error:', error)
        return errorResponse('Failed to add content', 500)
    }
}
