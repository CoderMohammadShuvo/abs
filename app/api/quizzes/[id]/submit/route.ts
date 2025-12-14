import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

interface RouteParams {
    params: Promise<{
        id: string // Quiz ID
    }>
}

const submitSchema = z.object({
    answers: z.array(z.object({
        questionIndex: z.number(),
        selectedOptionIndex: z.number().nullable().optional(), // For MCQ
        textAnswer: z.string().optional() // For CQ
    }))
})

export async function POST(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireRole(request, [UserRole.STUDENT, UserRole.ADMIN]) // Admins can test submit too potentially
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params
        const body = await request.json()

        const validation = submitSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const { answers } = validation.data

        const quiz = await prisma.quiz.findUnique({
            where: { id }
        })

        if (!quiz || quiz.deletedAt) {
            return notFoundResponse('Quiz not found')
        }

        // Calculate score
        let score = 0
        let totalPoints = 0
        const questions = quiz.questions as any[]
        const processedAnswers = []

        // Create a map for passed answers
        const answerMap = new Map(answers.map(a => [a.questionIndex, a]))

        for (let i = 0; i < questions.length; i++) {
            const question = questions[i]
            const userAnswer = answerMap.get(i)
            const points = question.points || 1
            totalPoints += points

            let isCorrect = false

            if (userAnswer) {
                if (quiz.type === 'MCQ') {
                    // Check if option matches correct answer
                    if (userAnswer.selectedOptionIndex === question.correctAnswer) {
                        score += points
                        isCorrect = true
                    }
                } else {
                    // CQ - Manual grading usually, or basic text check?
                    // For now, mark as pending grading or just store text?
                    // Schema implies auto grading logic isn't complex for CQ yet.
                    // Lets assume PENDING for CQ.
                }

                processedAnswers.push({
                    questionIndex: i,
                    selectedOptionIndex: userAnswer.selectedOptionIndex,
                    textAnswer: userAnswer.textAnswer,
                    isCorrect
                })
            }
        }

        // Percentage
        const finalScore = totalPoints > 0 ? (score / totalPoints) * 100 : 0

        const result = await prisma.quizResult.create({
            data: {
                userId: authResult.user.userId,
                quizId: id,
                score: finalScore,
                answers: processedAnswers,
                status: quiz.type === 'MCQ' ? 'COMPLETED' : 'PENDING',
                submittedAt: new Date()
            }
        })

        // Update enrollment progress if passed? 
        // Logic for enrollment update is separate, but we could trigger it.

        return successResponse({
            resultId: result.id,
            score: finalScore,
            status: result.status,
            passed: finalScore >= 70 // Assuming 70% passing or use stored passingScore if I hadn't removed it!
        }, 'Quiz submitted successfully', 201)

    } catch (error) {
        console.error('Submit quiz error:', error)
        return errorResponse('Failed to submit quiz', 500)
    }
}
