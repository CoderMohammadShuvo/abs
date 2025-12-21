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

// GET - Get course modules
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params

        const course = await prisma.course.findUnique({
            where: { id }
        })

        if (!course) {
            return notFoundResponse('Course not found')
        }

        // Note: 'deletedAt: null' filter removed as it was causing empty results despite data existing
        // This is a known issue with optional fields in Prisma/Mongo sometimes
        const modules = await prisma.courseModule.findMany({
            where: {
                courseId: id,
            },
            include: {
                courseContents: {
                    orderBy: { order: 'asc' }
                }
            },
            orderBy: { order: 'asc' }
        })

        // Manually filter deleted items if necessary, though ideally the query should handle it
        const activeModules = modules.filter(m => !m.deletedAt).map(m => ({
            ...m,
            courseContents: m.courseContents.filter(c => !c.deletedAt)
        }))

        return successResponse(activeModules)
    } catch (error) {
        console.error('Get modules error:', error)
        return errorResponse('Failed to fetch modules', 500)
    }
}

// POST - Add module to course
const createModuleSchema = z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    order: z.number().optional(),
    parentModuleId: z.string().optional()
})

export async function POST(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireRole(request, [UserRole.TEACHER, UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params
        const body = await request.json()

        // Validate input
        const validation = createModuleSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const { title, description, order, parentModuleId } = validation.data

        // Check if course exists
        const course = await prisma.course.findUnique({
            where: { id }
        })

        if (!course || course.deletedAt) {
            return notFoundResponse('Course not found')
        }

        // Check if user is the teacher or admin (TEACHER check relaxed for now or strictly enforced?)
        if (authResult.user.role === UserRole.TEACHER && course.teacherId !== authResult.user.userId) {
            return errorResponse('You can only add modules to your own courses', 403)
        }

        // Get the next order number if not provided
        let moduleOrder = order
        if (!moduleOrder) {
            const lastModule = await prisma.courseModule.findFirst({
                where: { courseId: id },
                orderBy: { order: 'desc' }
            })
            moduleOrder = lastModule ? lastModule.order + 1 : 1
        }

        // Create module
        const module = await prisma.courseModule.create({
            data: {
                title,
                description,
                order: moduleOrder,
                courseId: id,
                parentModuleId
            },
            include: {
                courseContents: true
            }
        })

        return successResponse(module, 'Module created successfully', 201)
    } catch (error) {
        console.error('Create module error:', error)
        return errorResponse('Failed to create module', 500)
    }
}
