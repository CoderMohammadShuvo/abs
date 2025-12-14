import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireRole, requireAdmin } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

// GET - Get course by ID or slug
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params

        // Try to find by ID first, then by slug
        let course = await prisma.course.findUnique({
            where: { id },
            include: {
                teacher: {
                    include: {
                        profile: true
                    }
                },
                categories: {
                    include: {
                        category: true
                    }
                },
                modules: {
                    include: {
                        courseContents: {
                            orderBy: { order: 'asc' }
                        }
                    },
                    orderBy: { order: 'asc' }
                },
                _count: {
                    select: {
                        enrollments: true,
                        modules: true
                    }
                }
            }
        })

        // If not found by ID, try by slug
        if (!course) {
            course = await prisma.course.findUnique({
                where: { slug: id },
                include: {
                    teacher: {
                        include: {
                            profile: true
                        }
                    },
                    categories: {
                        include: {
                            category: true
                        }
                    },
                    modules: {
                        include: {
                            courseContents: {
                                orderBy: { order: 'asc' }
                            }
                        },
                        orderBy: { order: 'asc' }
                    },
                    _count: {
                        select: {
                            enrollments: true,
                            modules: true
                        }
                    }
                }
            })
        }

        if (!course || course.deletedAt) {
            return notFoundResponse('Course not found')
        }

        return successResponse(course)
    } catch (error) {
        console.error('Get course error:', error)
        return errorResponse('Failed to fetch course', 500)
    }
}


// PUT - Update course
const updateCourseSchema = z.object({
    title: z.string().min(3).optional(),
    slug: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    level: z.string().optional(),
    isPaid: z.boolean().optional(),
    price: z.number().optional(),
    duration: z.number().optional(),
    thumbnailUrl: z.string().optional(),
    categoryIds: z.array(z.string()).optional()
})

export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireRole(request, [UserRole.TEACHER, UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params
        const body = await request.json()

        // Validate input
        const validation = updateCourseSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const data = validation.data

        // Check if course exists
        const existingCourse = await prisma.course.findUnique({
            where: { id }
        })

        if (!existingCourse || existingCourse.deletedAt) {
            return notFoundResponse('Course not found')
        }

        // Check if user is the teacher or admin
        if (authResult.user.role === UserRole.TEACHER && existingCourse.teacherId !== authResult.user.userId) {
            return errorResponse('You can only update your own courses', 403)
        }

        // If slug is being changed, check for conflicts
        if (data.slug && data.slug !== existingCourse.slug) {
            const slugExists = await prisma.course.findUnique({
                where: { slug: data.slug }
            })

            if (slugExists) {
                return errorResponse('Slug already in use', 409)
            }
        }

        // Prepare update data
        const updateData: any = {}
        if (data.title) updateData.title = data.title
        if (data.slug) updateData.slug = data.slug
        if (data.description) updateData.description = data.description
        if (data.level) updateData.level = data.level
        if (data.isPaid !== undefined) updateData.isPaid = data.isPaid
        if (data.price !== undefined) updateData.price = data.price
        if (data.duration !== undefined) updateData.duration = data.duration
        if (data.thumbnailUrl) updateData.thumbnailUrl = data.thumbnailUrl

        // Handle category updates
        if (data.categoryIds) {
            // Delete existing categories and create new ones
            await prisma.courseCategory.deleteMany({
                where: { courseId: id }
            })
            updateData.categories = {
                create: data.categoryIds.map(categoryId => ({
                    categoryId
                }))
            }
        }

        // Update course
        const course = await prisma.course.update({
            where: { id },
            data: updateData,
            include: {
                teacher: {
                    include: {
                        profile: true
                    }
                },
                categories: {
                    include: {
                        category: true
                    }
                }
            }
        })

        return successResponse(course, 'Course updated successfully')
    } catch (error) {
        console.error('Update course error:', error)
        return errorResponse('Failed to update course', 500)
    }
}

// DELETE - Delete course (soft delete)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params

        // Check if course exists
        const existingCourse = await prisma.course.findUnique({
            where: { id }
        })

        if (!existingCourse || existingCourse.deletedAt) {
            return notFoundResponse('Course not found')
        }

        // Soft delete course
        await prisma.course.update({
            where: { id },
            data: {
                deletedAt: new Date()
            }
        })

        return successResponse(null, 'Course deleted successfully')
    } catch (error) {
        console.error('Delete course error:', error)
        return errorResponse('Failed to delete course', 500)
    }
}
