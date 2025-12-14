import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

// GET - List conference submissions
export async function GET(request: NextRequest) {
    try {
        // Admin or Owner (Owner logic might be tricky for global list, sticking to admin/superadmin for global, or student for own)
        // Request says "View submissions: ADMIN, OWNER". Owner probably refers to conference owner? But explicit owner field is missing on Conference.
        // Assuming ADMIN/SUPER_ADMIN access.

        const authResult = requireRole(request, [UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) {
            return authResult
        }

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const conferenceId = searchParams.get('conferenceId')

        const skip = (page - 1) * limit
        const where: any = {}

        if (conferenceId) {
            where.conferenceId = conferenceId
        }

        const [submissions, total] = await Promise.all([
            prisma.conferenceSubmission.findMany({
                where,
                include: {
                    conference: { select: { title: true } },
                    user: {
                        select: { email: true, profile: { select: { fullName: true } } }
                    }
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.conferenceSubmission.count({ where })
        ])

        return successResponse({
            submissions,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('List submissions error:', error)
        return errorResponse('Failed to fetch submissions', 500)
    }
}
