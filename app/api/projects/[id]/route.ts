import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAuth, requireAdmin } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/lib/api-response'

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

// GET - Get project details
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireAuth(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params

        const project = await prisma.project.findUnique({
            where: { id },
            include: {
                creator: {
                    select: { email: true, profile: { select: { fullName: true } } }
                },
                tasks: {
                    where: { // Show active tasks
                        OR: [
                            { deletedAt: null },
                            { deletedAt: { isSet: false } }
                        ]
                    },
                    include: {
                        assignments: { // Task assignments
                            include: {
                                user: {
                                    select: { email: true, profile: { select: { fullName: true } } }
                                }
                            }
                        }
                    },
                    orderBy: { createdAt: 'desc' }
                }
            }
        })

        if (!project || project.deletedAt) {
            return notFoundResponse('Project not found')
        }

        // Access Control
        const isAdmin = authResult.user.role === 'ADMIN' || authResult.user.role === 'SUPER_ADMIN'
        const isCreator = project.creatorId === authResult.user.userId

        // Check if user has any task assigned in this project
        const isAssignedTask = project.tasks.some(task =>
            task.assignments.some(assignment => assignment.userId === authResult.user.userId)
        )

        if (!isAdmin && !isCreator && !isAssignedTask) {
            return errorResponse('Access denied', 403)
        }

        return successResponse(project)
    } catch (error) {
        console.error('Get project error:', error)
        return errorResponse('Failed to fetch project', 500)
    }
}

// PUT - Update project
const updateProjectSchema = z.object({
    title: z.string().min(3).optional(),
    description: z.string().optional()
})

export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params
        const body = await request.json()

        // Validate input
        const validation = updateProjectSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const { title, description } = validation.data

        // Check if project exists
        const existingProject = await prisma.project.findUnique({
            where: { id }
        })

        if (!existingProject || existingProject.deletedAt) {
            return notFoundResponse('Project not found')
        }

        const project = await prisma.project.update({
            where: { id },
            data: {
                title,
                description
            }
        })

        return successResponse(project, 'Project updated successfully')
    } catch (error) {
        console.error('Update project error:', error)
        return errorResponse('Failed to update project', 500)
    }
}

// DELETE - Delete project
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params

        // Check if project exists
        const existingProject = await prisma.project.findUnique({
            where: { id }
        })

        if (!existingProject || existingProject.deletedAt) {
            return notFoundResponse('Project not found')
        }

        // Soft delete project
        await prisma.project.update({
            where: { id },
            data: {
                deletedAt: new Date()
            }
        })

        return successResponse(null, 'Project deleted successfully')
    } catch (error) {
        console.error('Delete project error:', error)
        return errorResponse('Failed to delete project', 500)
    }
}
