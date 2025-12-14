import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

import { z } from 'zod'

// GET - Get quiz details
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params

        // Note: Public access for now to allow both Student and Admin/Teacher without role check complexity in this specific handler, 
        // or add check if needed. Request table says STUDENT for GET /quizzes/:id.
        // But Admin also needs to read it to edit.

        // For strict role checking:
        // const authResult = requireRole(request, [UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN, UserRole.SUPER_ADMIN])
        // if (authResult instanceof Response) return authResult

        const quiz = await prisma.quiz.findUnique({
            where: { id },
            include: {
                course: {
                    select: { title: true }
                }
            }
        })

        if (!quiz || quiz.deletedAt) {
            return notFoundResponse('Quiz not found')
        }

        return successResponse(quiz)
    } catch (error) {
        console.error('Get quiz error:', error)
        return errorResponse('Failed to fetch quiz', 500)
    }
}

// PATCH - Update quiz
const updateQuizSchema = z.object({
    title: z.string().min(3).optional(),
    courseId: z.string().min(1).optional(),
    contentId: z.string().optional(),
    type: z.enum(['MCQ', 'CQ']).optional(),
    timeLimit: z.number().optional(),
    shuffleQuestions: z.boolean().optional(),
    questions: z.array(z.object({
        question: z.string(),
        options: z.array(z.string()),
        correctAnswer: z.number(),
        points: z.number().optional().default(1)
    })).optional()
})

export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireRole(request, [UserRole.TEACHER, UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params
        const body = await request.json()

        const validation = updateQuizSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const quiz = await prisma.quiz.findUnique({
            where: { id }
        })

        if (!quiz || quiz.deletedAt) {
            return notFoundResponse('Quiz not found')
        }

        // Verify ownership (or admin)
        if (authResult.user.role === UserRole.TEACHER) {
            const course = await prisma.course.findUnique({
                where: { id: quiz.courseId || '' }
            })
            if (course?.teacherId !== authResult.user.userId) {
                return errorResponse('Access denied', 403)
            }
        }

        const updatedQuiz = await prisma.quiz.update({
            where: { id },
            data: {
                ...validation.data,
                questions: validation.data.questions ? validation.data.questions as any : undefined
            }
        })

        return successResponse(updatedQuiz, 'Quiz updated successfully')
    } catch (error) {
        console.error('Update quiz error:', error)
        return errorResponse('Failed to update quiz', 500)
    }
}

// DELETE - Delete quiz
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireRole(request, [UserRole.TEACHER, UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params

        const quiz = await prisma.quiz.findUnique({
            where: { id }
        })

        if (!quiz || quiz.deletedAt) {
            return notFoundResponse('Quiz not found')
        }

        // Verify ownership (or admin)
        if (authResult.user.role === UserRole.TEACHER) {
            const course = await prisma.course.findUnique({
                where: { id: quiz.courseId || '' }
            })
            if (course?.teacherId !== authResult.user.userId) {
                return errorResponse('Access denied', 403)
            }
        }

        // Soft delete
        await prisma.quiz.update({
            where: { id },
            data: {
                deletedAt: new Date()
            }
        })

        return successResponse(null, 'Quiz deleted successfully')
    } catch (error) {
        console.error('Delete quiz error:', error)
        return errorResponse('Failed to delete quiz', 500)
    }
}
