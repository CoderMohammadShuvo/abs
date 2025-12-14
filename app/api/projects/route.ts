import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-middleware'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response'

// GET - List all projects
export async function GET(request: NextRequest) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')

        const skip = (page - 1) * limit

        // Build where clause
        const where: any = {
            OR: [
                { deletedAt: null },
                { deletedAt: { isSet: false } }
            ]
        }

        // Fetch projects and total count
        const [projects, total] = await Promise.all([
            prisma.project.findMany({
                where,
                include: {
                    tasks: {
                        where: { deletedAt: null },
                        select: { id: true, status: true } // Just get counts or basics
                    },
                    creator: {
                        select: {
                            email: true,
                            profile: { select: { fullName: true } }
                        }
                    }
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.project.count({ where })
        ])

        return successResponse({
            projects,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('List projects error:', error)
        return errorResponse('Failed to fetch projects', 500)
    }
}

// POST - Create project
const createProjectSchema = z.object({
    title: z.string().min(3),
    description: z.string().optional()
})

export async function POST(request: NextRequest) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const body = await request.json()

        // Validate input
        const validation = createProjectSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const { title, description } = validation.data

        // Create project
        const project = await prisma.project.create({
            data: {
                title,
                description,
                creatorId: authResult.user.userId
            }
        })

        return successResponse(project, 'Project created successfully', 201)
    } catch (error) {
        console.error('Create project error:', error)
        return errorResponse('Failed to create project', 500)
    }
}
