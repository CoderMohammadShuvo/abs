import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

// GET - Get certificate for completed enrollment
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireRole(request, [UserRole.STUDENT])
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params

        // Get enrollment
        const enrollment = await prisma.enrollment.findUnique({
            where: { id },
            include: {
                course: {
                    include: {
                        teacher: {
                            include: {
                                profile: true
                            }
                        }
                    }
                },
                user: {
                    include: {
                        profile: true
                    }
                }
            }
        })

        if (!enrollment || enrollment.deletedAt) {
            return notFoundResponse('Enrollment not found')
        }

        // Verify ownership
        if (enrollment.userId !== authResult.user.userId) {
            return errorResponse('Access denied', 403)
        }

        // Check if course is completed
        if (enrollment.progress < 100 || !enrollment.completedAt) {
            return errorResponse('Course not completed yet', 400)
        }

        // Check if certificate already exists
        let certificate = await prisma.certificate.findFirst({
            where: {
                userId: authResult.user.userId,
                courseId: enrollment.courseId
            }
        })

        // Generate certificate if it doesn't exist
        if (!certificate) {
            const certId = `CERT-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`

            certificate = await prisma.certificate.create({
                data: {
                    certId,
                    userId: authResult.user.userId,
                    courseId: enrollment.courseId,
                    issuedAt: new Date(),
                    courseName: enrollment.course.title,
                    studentName: enrollment.user.profile?.fullName || enrollment.user.email,
                    instructorName: enrollment.course.teacher?.profile?.fullName || 'Instructor'
                }
            })
        }

        return successResponse(certificate)
    } catch (error) {
        console.error('Get certificate error:', error)
        return errorResponse('Failed to fetch certificate', 500)
    }
}
