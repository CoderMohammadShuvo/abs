import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/lib/api-response'

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

const submissionSchema = z.object({
    paperTitle: z.string().min(5),
    abstract: z.string().min(50),
    authors: z.array(z.string()).optional(), // Names
    fileUrl: z.string().url()
})

// POST - Submit paper to conference
export async function POST(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireAuth(request) // Student or Teacher
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params
        const body = await request.json()

        const validation = submissionSchema.safeParse(body)
        if (!validation.success) {
            return validationErrorResponse(
                validation.error.errors.reduce((acc, err) => {
                    acc[err.path[0]] = err.message
                    return acc
                }, {} as Record<string, string>)
            )
        }

        const { paperTitle, abstract, authors, fileUrl } = validation.data

        const conference = await prisma.conference.findUnique({
            where: { id }
        })

        if (!conference || conference.deletedAt) {
            return notFoundResponse('Conference not found')
        }

        if (conference.submissionDeadline && new Date() > conference.submissionDeadline) {
            return errorResponse('Submission deadline has passed', 400)
        }

        const submission = await prisma.conferenceSubmission.create({
            data: {
                conferenceId: id,
                userId: authResult.user.userId,
                status: 'PENDING',
                formData: {
                    paperTitle,
                    abstract,
                    authors,
                    fileUrl
                }
            }
        })

        return successResponse(submission, 'Paper submitted successfully', 201)
    } catch (error) {
        console.error('Submit paper error:', error)
        return errorResponse('Failed to submit paper', 500)
    }
}
