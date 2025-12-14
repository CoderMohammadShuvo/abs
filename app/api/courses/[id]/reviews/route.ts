import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireRole, requireAuth } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

// GET - Get course reviews
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')

        const skip = (page - 1) * limit

        const course = await prisma.course.findUnique({
            where: { id }
        })

        if (!course || course.deletedAt) {
            return notFoundResponse('Course not found')
        }

        // For now, we'll return a placeholder since Review model isn't in the schema
        // In a real implementation, you'd query the Review model
        const reviews: any[] = []
        const total = 0

        return successResponse({
            reviews,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('Get reviews error:', error)
        return errorResponse('Failed to fetch reviews', 500)
    }
}

// POST - Add review to course
const createReviewSchema = z.object({
    rating: z.number().min(1).max(5),
    comment: z.string().min(10).optional()
})

export async function POST(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireRole(request, [UserRole.STUDENT])
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params
        const body = await request.json()

        // Validate input
        const validation = createReviewSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const { rating, comment } = validation.data

        // Check if course exists
        const course = await prisma.course.findUnique({
            where: { id }
        })

        if (!course || course.deletedAt) {
            return notFoundResponse('Course not found')
        }

        // Check if user is enrolled in the course
        const enrollment = await prisma.enrollment.findFirst({
            where: {
                userId: authResult.user.userId,
                courseId: id,
                deletedAt: null
            }
        })

        if (!enrollment) {
            return errorResponse('You must be enrolled in this course to leave a review', 403)
        }

        // For now, return a placeholder response since Review model isn't in the schema
        // In a real implementation, you'd create the review
        return successResponse(
            { rating, comment, courseId: id, userId: authResult.user.userId },
            'Review added successfully (placeholder)',
            201
        )
    } catch (error) {
        console.error('Create review error:', error)
        return errorResponse('Failed to create review', 500)
    }
}
