import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response'

// POST - Generate certificate (System/Internal use)
const generateCertificateSchema = z.object({
    userId: z.string().min(1),
    courseId: z.string().min(1),
    systemKey: z.string().min(1) // Internal system key for security
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validate input
        const validation = generateCertificateSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const { userId, courseId, systemKey } = validation.data

        // Verify system key (in production, use environment variable)
        const expectedKey = process.env.SYSTEM_CERTIFICATE_KEY || 'system-key-change-in-production'
        if (systemKey !== expectedKey) {
            return errorResponse('Unauthorized', 401)
        }

        // Check if enrollment exists and is completed
        const enrollment = await prisma.enrollment.findFirst({
            where: {
                userId,
                courseId,
                progress: 100,
                deletedAt: null
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
                },
                user: {
                    include: {
                        profile: true
                    }
                }
            }
        })

        if (!enrollment) {
            return errorResponse('Enrollment not found or course not completed', 404)
        }

        // Check if certificate already exists
        const existingCertificate = await prisma.certificate.findFirst({
            where: {
                userId,
                courseId
            }
        })

        if (existingCertificate) {
            return errorResponse('Certificate already exists', 409)
        }

        // Generate unique certificate ID
        const certId = `CERT-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`

        // Create certificate
        const certificate = await prisma.certificate.create({
            data: {
                certId,
                userId,
                courseId,
                issuedAt: new Date(),
                courseName: enrollment.course.title,
                studentName: enrollment.user.profile?.fullName || enrollment.user.email,
                instructorName: enrollment.course.teacher?.profile?.fullName || 'Instructor'
            }
        })

        return successResponse(certificate, 'Certificate generated successfully', 201)
    } catch (error) {
        console.error('Generate certificate error:', error)
        return errorResponse('Failed to generate certificate', 500)
    }
}
