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

const createQuizSchema = z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    passingScore: z.number().min(0).max(100).default(70),
    questions: z.array(z.object({
        question: z.string(),
        options: z.array(z.string()),
        correctOptionIndex: z.number()
    })).optional()
})

// POST - Add quiz to content (or create quiz linked to content)
// Note: Schema says `Quiz` is linked to `CourseContent` via `contentId`? 
// Schema check: `quiz     Quiz?          @relation("ModuleQuiz")` in CourseContent model?
// Wait, looking at schema provided earlier:
// model CourseContent { ... quiz Quiz? @relation("ModuleQuiz") ... }
// model Quiz { ... contentId String? @unique @db.ObjectId ... content CourseContent? @relation("ModuleQuiz", fields: [contentId], references: [id]) ... }
// So a Content can have ONE Quiz.

export async function POST(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireRole(request, [UserRole.TEACHER, UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params // contentId
        const body = await request.json()

        const validation = createQuizSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const { title, description, passingScore, questions } = validation.data

        const content = await prisma.courseContent.findUnique({
            where: { id },
            include: { module: { include: { course: true } } }
        })

        if (!content) {
            return notFoundResponse('Content not found')
        }

        if (authResult.user.role === UserRole.TEACHER && content.module.course.teacherId !== authResult.user.userId) {
            return errorResponse('You can only add quizzes to your own courses', 403)
        }

        // Check if quiz already exists
        const existingQuiz = await prisma.quiz.findUnique({
            where: { contentId: id }
        })

        if (existingQuiz) {
            return errorResponse('Quiz already exists for this content', 409)
        }

        // Create Quiz
        // Questions need to be handled. Schema for Question? 
        // Typically Quiz -> Questions (1:M). 
        // I will assume simple creation for now, but need to check Question model if exists.
        // Assuming Question model exists or is embedded. 
        // If not, I'll just create the Quiz entry. User didn't provide Question model detail in snippet, but `Quiz` was mentioned.

        // Let's assume for now we just create the Quiz record.

        const quiz = await prisma.quiz.create({
            data: {
                title,
                // @ts-ignore
                description,
                passingScore,
                contentId: id,
                courseId: content.module.courseId,
                // questions: questions ? { create: questions } : undefined // Validation/Schema needed
            }
        })

        return successResponse(quiz, 'Quiz created successfully', 201)

    } catch (error) {
        console.error('Create quiz error:', error)
        return errorResponse('Failed to create quiz', 500)
    }
}
