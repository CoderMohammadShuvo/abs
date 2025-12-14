import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

// GET - List applications
export async function GET(request: NextRequest) {
    try {
        const authResult = requireRole(request, [UserRole.STUDENT, UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) {
            return authResult
        }

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const status = searchParams.get('status') || ''
        const scholarshipId = searchParams.get('scholarshipId') || ''

        const skip = (page - 1) * limit

        // Build where clause
        const where: any = {}

        // Students can only see their own applications
        if (authResult.user.role === UserRole.STUDENT) {
            where.userId = authResult.user.userId
        }

        if (status) {
            where.status = status
        }

        if (scholarshipId) {
            where.scholarshipId = scholarshipId
        }

        // Fetch applications and total count
        const [applications, total] = await Promise.all([
            prisma.scholarshipApplication.findMany({
                where,
                include: {
                    scholarship: true,
                    user: {
                        include: {
                            profile: true
                        }
                    }
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.scholarshipApplication.count({ where })
        ])

        return successResponse({
            applications,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('List applications error:', error)
        return errorResponse('Failed to fetch applications', 500)
    }
}
