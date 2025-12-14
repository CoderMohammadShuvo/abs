import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api-response'

interface RouteParams {
    params: Promise<{
        certId: string
    }>
}

// GET - Verify certificate (Public endpoint)
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { certId } = await params

        const certificate = await prisma.certificate.findUnique({
            where: { certId },
            include: {
                user: {
                    include: {
                        profile: true
                    }
                },
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

        if (!certificate) {
            return notFoundResponse('Certificate not found')
        }

        // Return certificate details for verification
        return successResponse({
            certId: certificate.certId,
            studentName: certificate.studentName,
            courseName: certificate.courseName,
            instructorName: certificate.instructorName,
            issuedAt: certificate.issuedAt,
            isValid: true,
            course: {
                title: certificate.course?.title,
                teacher: certificate.course?.teacher?.profile?.fullName
            }
        })
    } catch (error) {
        console.error('Verify certificate error:', error)
        return errorResponse('Failed to verify certificate', 500)
    }
}
