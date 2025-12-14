import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

interface RouteParams {
    params: Promise<{
        id: string // QuizResult ID
    }>
}

// GET - Get quiz result details
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireRole(request, [UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN])
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params

        const result = await prisma.quizResult.findUnique({
            where: { id },
            include: {
                quiz: {
                    select: {
                        title: true,
                        questions: true,
                        type: true
                    }
                },
                user: {
                    select: {
                        email: true,
                        profile: {
                            select: { fullName: true }
                        }
                    }
                }
            }
        })

        if (!result) {
            return notFoundResponse('Quiz result not found')
        }

        // Access check
        if (authResult.user.role === UserRole.STUDENT && result.userId !== authResult.user.userId) {
            return errorResponse('Access denied', 403)
        }

        // If teacher, check if they own the course (via quiz -> course)
        if (authResult.user.role === UserRole.TEACHER) {
            const quiz = await prisma.quiz.findUnique({
                where: { id: result.quizId },
                select: { courseId: true }
            })

            if (quiz?.courseId) {
                const course = await prisma.course.findUnique({ where: { id: quiz.courseId } })
                if (course?.teacherId !== authResult.user.userId) {
                    return errorResponse('Access denied', 403)
                }
            }
        }

        return successResponse(result)
    } catch (error) {
        console.error('Get result error:', error)
        return errorResponse('Failed to fetch result', 500)
    }
}
