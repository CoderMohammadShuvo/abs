import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/lib/api-response'
import { Priority } from '@prisma/client'

interface RouteParams {
    params: Promise<{
        id: string // Project ID
    }>
}

const createTaskSchema = z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    assignedUserIds: z.array(z.string()).optional(),
    priority: z.nativeEnum(Priority).default('MEDIUM'),
    dueAt: z.string().optional()
})

// POST - Add task to project
export async function POST(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params
        const body = await request.json()

        const validation = createTaskSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const { title, description, assignedUserIds, priority, dueAt } = validation.data

        // Check project
        const project = await prisma.project.findUnique({
            where: { id }
        })

        if (!project || project.deletedAt) {
            return notFoundResponse('Project not found')
        }

        const task = await prisma.task.create({
            data: {
                projectId: id,
                title,
                description,
                priority,
                dueAt: dueAt ? new Date(dueAt) : null,
                assignments: assignedUserIds ? {
                    create: assignedUserIds.map(userId => ({
                        userId
                    }))
                } : undefined
            },
            include: {
                assignments: {
                    include: {
                        user: {
                            select: { email: true, profile: { select: { fullName: true } } }
                        }
                    }
                }
            }
        })

        return successResponse(task, 'Task created successfully', 201)

    } catch (error) {
        console.error('Create task error:', error)
        return errorResponse('Failed to create task', 500)
    }
}
