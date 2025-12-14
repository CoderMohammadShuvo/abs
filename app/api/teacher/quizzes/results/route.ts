import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

// GET - List all quiz results (Analytics)
export async function GET(request: NextRequest) {
    try {
        const authResult = requireRole(request, [UserRole.TEACHER, UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) {
            return authResult
        }

        const { searchParams } = new URL(request.url)
        const quizId = searchParams.get('quizId')
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '20')

        const skip = (page - 1) * limit
        const where: any = {}

        if (quizId) {
            where.quizId = quizId
        }

        // Role based filtering
        if (authResult.user.role === UserRole.TEACHER) {
            // Find quizzes owned by teacher
            const teacherCourses = await prisma.course.findMany({
                where: { teacherId: authResult.user.userId },
                select: { id: true }
            })
            const courseIds = teacherCourses.map(c => c.id)

            // Filter results where quiz belongs to one of these courses
            // This requires looking up quizzes first or using relation filtering if supported in 'where' easily
            // Relation filtering in Prisma:
            where.quiz = {
                courseId: { in: courseIds }
            }
        }

        const [results, total] = await Promise.all([
            prisma.quizResult.findMany({
                where,
                include: {
                    user: {
                        select: {
                            email: true,
                            profile: {
                                select: { fullName: true }
                            }
                        }
                    },
                    quiz: {
                        select: {
                            title: true
                        }
                    }
                },
                skip,
                take: limit,
                orderBy: { submittedAt: 'desc' }
            }),
            prisma.quizResult.count({ where })
        ])

        return successResponse({
            results,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('List quiz results error:', error)
        return errorResponse('Failed to fetch quiz results', 500)
    }
}
