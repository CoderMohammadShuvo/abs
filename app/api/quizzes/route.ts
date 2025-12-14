import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

// POST - Create quiz
const createQuizSchema = z.object({
    title: z.string().min(3),
    courseId: z.string().min(1),
    contentId: z.string().optional(),
    type: z.enum(['MCQ', 'CQ']).default('MCQ'),
    timeLimit: z.number().optional(),
    shuffleQuestions: z.boolean().optional().default(false),
    questions: z.array(z.object({
        question: z.string(),
        options: z.array(z.string()),
        correctAnswer: z.number(),
        points: z.number().optional().default(1)
    }))
})

export async function POST(request: NextRequest) {
    try {
        const authResult = requireRole(request, [UserRole.TEACHER, UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) {
            return authResult
        }

        const body = await request.json()

        // Validate input
        const validation = createQuizSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const { title, courseId, contentId, type, timeLimit, shuffleQuestions, questions } = validation.data

        // Check if course exists
        const course = await prisma.course.findUnique({
            where: { id: courseId }
        })

        if (!course || course.deletedAt) {
            return errorResponse('Course not found', 404)
        }

        // Check if user is the teacher or admin
        if (authResult.user.role === UserRole.TEACHER && course.teacherId !== authResult.user.userId) {
            return errorResponse('You can only create quizzes for your own courses', 403)
        }

        // Create quiz
        const quiz = await prisma.quiz.create({
            data: {
                title,
                courseId,
                contentId,
                type: type as any,
                timeLimit,
                shuffleQuestions,
                questions: questions as any
            }
        })

        return successResponse(quiz, 'Quiz created successfully', 201)
    } catch (error) {
        console.error('Create quiz error:', error)
        return errorResponse('Failed to create quiz', 500)
    }
}

// GET - List quizzes
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const courseId = searchParams.get('courseId') || ''

        const skip = (page - 1) * limit
        const where: any = {
            OR: [
                { deletedAt: null },
                { deletedAt: { isSet: false } }
            ]
        }

        if (courseId) {
            where.courseId = courseId
        }

        const [quizzes, total] = await Promise.all([
            prisma.quiz.findMany({
                where,
                include: {
                    course: {
                        select: {
                            title: true
                        }
                    }
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.quiz.count({ where })
        ])

        return successResponse({
            quizzes,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('List quizzes error:', error)
        return errorResponse('Failed to fetch quizzes', 500)
    }
}
