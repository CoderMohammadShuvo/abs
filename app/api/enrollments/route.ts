import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

// GET - List enrolled courses
export async function GET(request: NextRequest) {
    try {
        const authResult = requireRole(request, [UserRole.STUDENT, UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) {
            return authResult
        }

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const status = searchParams.get('status') || ''
        const studentId = searchParams.get('studentId') || ''
        const courseId = searchParams.get('courseId') || ''

        const skip = (page - 1) * limit

        // Build where clause
        const where: any = {
            deletedAt: null
        }

        // If not admin, restrict to own data
        if (authResult.user.role === UserRole.STUDENT) {
            where.userId = authResult.user.userId
        } else if (studentId) {
            // Admin can filter by student
            where.userId = studentId
        }

        if (status) {
            // Note: Enrollment schema currently doesn't have 'status' field in the version I saw??
            // Checking schema from previous step 4... Enrollment has: progress, paid, enrolledAt... 
            // It does NOT have 'status' field in schema!
            // But the original code had 'status: "active"' in create and check in GET.
            // Let's check if schema has status.
            // Schema at line 299: id, userId, courseId, progress, moduleProgress, paid, enrolledAt... NO STATUS.
            // So original code 'where.status = status' and create 'status: "active"' was probably wrong or using implicit field?
            // MongoDB allows flexible schema but Prisma implies strict unless I missed it.
            // The original code was potentially broken regarding 'status'. 
            // I will remove status filter/field to be safe with schema, or assume it's ignored.
            // For now I'll comment it out or mapping if needed. 
            // Actually, let's just ignore it for now to avoid breaking if it doesn't exist.
        }

        if (courseId) {
            where.courseId = courseId
        }

        // Fetch enrollments and total count
        const [enrollments, total] = await Promise.all([
            prisma.enrollment.findMany({
                where,
                include: {
                    course: {
                        include: {
                            teacher: {
                                include: {
                                    profile: true
                                }
                            }
                        }
                    },
                    user: {
                        include: {
                            profile: true
                        }
                    }
                },
                skip,
                take: limit,
                orderBy: { enrolledAt: 'desc' }
            }),
            prisma.enrollment.count({ where })
        ])

        return successResponse({
            enrollments,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('List enrollments error:', error)
        return errorResponse('Failed to fetch enrollments', 500)
    }
}

// POST - Enroll in a course
const enrollSchema = z.object({
    courseId: z.string().min(1, 'Course ID is required'),
    userId: z.string().optional() // Optional, for admin use
})

export async function POST(request: NextRequest) {
    try {
        const authResult = requireRole(request, [UserRole.STUDENT, UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) {
            return authResult
        }

        const body = await request.json()

        // Validate input
        const validation = enrollSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const { courseId } = validation.data
        let targetUserId = authResult.user.userId

        // If admin, allow enrolling another user
        if (authResult.user.role !== UserRole.STUDENT && validation.data.userId) {
            targetUserId = validation.data.userId
        }

        // Check if course exists
        const course = await prisma.course.findUnique({
            where: { id: courseId }
        })

        if (!course || course.deletedAt) {
            return errorResponse('Course not found', 404)
        }

        // Check if already enrolled
        const existingEnrollment = await prisma.enrollment.findFirst({
            where: {
                userId: targetUserId,
                courseId,
                deletedAt: null
            }
        })

        if (existingEnrollment) {
            return errorResponse('Already enrolled in this course', 409)
        }

        // Create enrollment
        const enrollment = await prisma.enrollment.create({
            data: {
                userId: targetUserId,
                courseId,
                // status: 'active', // STATUS NOT IN SCHEMA, REMOVING
                progress: 0,
                paid: (course.price || 0) <= 0, // Free courses are automatically paid
                enrolledAt: new Date()
            },
            include: {
                course: {
                    include: {
                        teacher: {
                            include: {
                                profile: true
                            }
                        }
                    }
                }
            }
        })

        return successResponse(enrollment, 'Enrolled successfully', 201)
    } catch (error) {
        console.error('Enroll error:', error)
        return errorResponse('Failed to enroll in course', 500)
    }
}
