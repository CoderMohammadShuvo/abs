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

// POST - Apply for scholarship
const applyScholarshipSchema = z.object({
    personalStatement: z.string().min(50),
    academicInfo: z.record(z.any()).optional(),
    documents: z.array(z.any()).optional()
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
        const validation = applyScholarshipSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const { personalStatement, academicInfo, documents } = validation.data

        // Check if scholarship exists and is active
        const scholarship = await prisma.scholarship.findUnique({
            where: { id }
        })

        if (!scholarship || !scholarship.isActive) {
            return errorResponse('Scholarship not found or inactive', 400)
        }

        // Note: No deadline field in schema now properly confirmed, so skipping deadline check unless inferred from detailsJson

        // Check if user already applied
        const existingApplication = await prisma.scholarshipApplication.findUnique({
            where: {
                userId_scholarshipId: {
                    userId: authResult.user.userId,
                    scholarshipId: id
                }
            }
        })

        if (existingApplication) {
            return errorResponse('You have already applied for this scholarship', 409)
        }

        // Create application
        const application = await prisma.scholarshipApplication.create({
            data: {
                scholarshipId: id,
                userId: authResult.user.userId,
                formData: {
                    personalStatement,
                    academicInfo,
                    documents
                },
                status: 'PENDING'
            },
            include: {
                scholarship: true
            }
        })

        return successResponse(application, 'Application submitted successfully', 201)
    } catch (error) {
        console.error('Apply scholarship error:', error)
        return errorResponse('Failed to submit application', 500)
    }
}
