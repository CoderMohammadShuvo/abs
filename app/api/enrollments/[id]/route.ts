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

// GET - Get enrollment details
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireRole(request, [UserRole.STUDENT, UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params

        const enrollment = await prisma.enrollment.findUnique({
            where: { id },
            include: {
                course: {
                    include: {
                        teacher: {
                            include: {
                                profile: true
                            }
                        },
                        modules: {
                            include: {
                                courseContents: {
                                    orderBy: { order: 'asc' }
                                }
                            },
                            orderBy: { order: 'asc' }
                        }
                    }
                }
            }
        })

        if (!enrollment || enrollment.deletedAt) {
            return notFoundResponse('Enrollment not found')
        }

        // Verify ownership (skip for admins)
        if (enrollment.userId !== authResult.user.userId && authResult.user.role === UserRole.STUDENT) {
            return errorResponse('Access denied', 403)
        }

        return successResponse(enrollment)
    } catch (error) {
        console.error('Get enrollment error:', error)
        return errorResponse('Failed to fetch enrollment', 500)
    }
}
