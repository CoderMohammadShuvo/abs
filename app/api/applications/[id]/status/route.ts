import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/lib/api-response'
import { UserRole, ApplicationStatus } from '@prisma/client'

interface RouteParams {
    params: Promise<{
        id: string // Application ID
    }>
}

const updateStatusSchema = z.object({
    status: z.nativeEnum(ApplicationStatus)
})

// PATCH - Update application status
export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireRole(request, [UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params
        const body = await request.json()

        const validation = updateStatusSchema.safeParse(body)
        if (!validation.success) {
            return validationErrorResponse({ status: 'Invalid status' })
        }

        const { status } = validation.data

        const application = await prisma.scholarshipApplication.findUnique({
            where: { id }
        })

        if (!application) {
            return notFoundResponse('Application not found')
        }

        const updatedApplication = await prisma.scholarshipApplication.update({
            where: { id },
            data: { status }
        })

        return successResponse(updatedApplication, 'Status updated successfully')
    } catch (error) {
        console.error('Update app status error:', error)
        return errorResponse('Failed to update status', 500)
    }
}
