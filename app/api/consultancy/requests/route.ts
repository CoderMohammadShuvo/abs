import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

// GET - List requests (ADMIN only)
export async function GET(request: NextRequest) {
    try {
        const authResult = requireRole(request, [UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) return authResult

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '20')
        const status = searchParams.get('status')

        const skip = (page - 1) * limit
        const where: any = {}
        if (status) where.status = status

        const [requests, total] = await Promise.all([
            prisma.consultancyRequest.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: { select: { email: true, profile: { select: { fullName: true } } } }
                }
            }),
            prisma.consultancyRequest.count({ where })
        ])

        return successResponse({
            requests,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
        })

    } catch (error) {
        console.error('List consultancy requests error:', error)
        return errorResponse('Failed to fetch requests', 500)
    }
}
