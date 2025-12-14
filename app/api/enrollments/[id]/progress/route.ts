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

// PATCH - Update course progress
const updateProgressSchema = z.object({
    progress: z.number().min(0).max(100),
    completedContentIds: z.array(z.string()).optional(),
    lastAccessedContentId: z.string().optional()
})

export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireRole(request, [UserRole.STUDENT, UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params
        const body = await request.json()

        // Validate input
        const validation = updateProgressSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const { progress, completedContentIds, lastAccessedContentId } = validation.data

        // Check if enrollment exists
        const enrollment = await prisma.enrollment.findUnique({
            where: { id },
            include: {
                course: true
            }
        })

        if (!enrollment || enrollment.deletedAt) {
            return notFoundResponse('Enrollment not found')
        }

        // Verify ownership (skip for admins)
        if (enrollment.userId !== authResult.user.userId && authResult.user.role === UserRole.STUDENT) {
            return errorResponse('Access denied', 403)
        }

        // Update enrollment
        const updatedEnrollment = await prisma.enrollment.update({
            where: { id },
            data: {
                progress,
                completedAt: progress === 100 ? new Date() : null
                // status field removed as it does not exist in schema
            },
            include: {
                course: {
                    include: {
                        teacher: {
                            include: {
                                profile: true
                            }
                        }
                    }
                }
            }
        })

        // If course is completed, trigger certificate generation
        if (progress === 100 && !enrollment.completedAt) {
            // Certificate generation will be handled separately
            // For now, just mark as completed
        }

        return successResponse(updatedEnrollment, 'Progress updated successfully')
    } catch (error) {
        console.error('Update progress error:', error)
        return errorResponse('Failed to update progress', 500)
    }
}
