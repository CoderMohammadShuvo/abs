import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

// GET - List all courses with pagination and filtering
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const search = searchParams.get('search') || ''
        const categoryId = searchParams.get('categoryId') || ''
        const level = searchParams.get('level') || ''

        const skip = (page - 1) * limit

        // Build where clause
        const where: any = {
            OR: [
                { deletedAt: null },
                { deletedAt: { isSet: false } }
            ]
        }

        if (search) {
            const searchFilter = {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } }
                ]
            }

            // Merge with existing OR if needed, or structured differently
            // Since we have OR for deletedAt, we need to be careful.
            // AND the deletedAt condition with the search condition
            where.AND = [
                {
                    OR: [
                        { deletedAt: null },
                        { deletedAt: { isSet: false } }
                    ]
                },
                searchFilter
            ]

            // Remove the top-level OR for deletedAt since we moved it to AND
            delete where.OR
        }

        if (categoryId) {
            where.categories = {
                some: {
                    categoryId
                }
            }
        }

        if (level) {
            where.level = level
        }

        // Fetch courses and total count
        const [courses, total] = await Promise.all([
            prisma.course.findMany({
                where,
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
                    _count: {
                        select: {
                            enrollments: true,
                            modules: true
                        }
                    }
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.course.count({ where })
        ])

        const mappedCourses = courses.map(course => ({
            ...course,
            isPaid: (course.price || 0) > 0
        }))

        return successResponse({
            courses: mappedCourses,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('List courses error:', error)
        return errorResponse('Failed to fetch courses', 500)
    }
}

// POST - Create new course
const createCourseSchema = z.object({
    title: z.string().min(3),
    slug: z.string().min(3),
    description: z.string().min(10),
    level: z.string().optional(),
    isPaid: z.boolean().optional().default(false),
    price: z.number().optional().default(0),
    duration: z.number().optional(),
    thumbnailUrl: z.string().optional(),
    categoryIds: z.array(z.string()).optional()
})

export async function POST(request: NextRequest) {
    try {
        const authResult = requireRole(request, [UserRole.TEACHER, UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) {
            return authResult
        }

        const body = await request.json()

        // Validate input
        const validation = createCourseSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const { title, slug, description, level, isPaid, price, duration, thumbnailUrl, categoryIds } = validation.data

        // Check if slug exists
        const existingCourse = await prisma.course.findUnique({
            where: { slug }
        })

        if (existingCourse) {
            return errorResponse('Course with this slug already exists', 409)
        }

        // Create course
        const course = await prisma.course.create({
            data: {
                title,
                slug,
                description,
                level,
                price: isPaid ? price : 0,
                durationHours: duration,
                thumbnail: thumbnailUrl,
                teacherId: authResult.user.userId,
                categories: categoryIds ? {
                    create: categoryIds.map(categoryId => ({
                        categoryId
                    }))
                } : undefined
            },
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

        return successResponse(course, 'Course created successfully', 201)
    } catch (error) {
        console.error('Create course error:', error)
        return errorResponse('Failed to create course', 500)
    }
}
