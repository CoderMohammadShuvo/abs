import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

// GET - List audit logs
export async function GET(request: NextRequest) {
    try {
        const authResult = requireRole(request, [UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) return authResult

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '20')
        const userId = searchParams.get('userId')
        const entity = searchParams.get('entity')
        const action = searchParams.get('action')

        const skip = (page - 1) * limit
        const where: any = {}

        if (userId) where.userId = userId
        if (entity) where.entity = entity
        if (action) where.action = action

        const [logs, total] = await Promise.all([
            prisma.auditLog.findMany({
                where,
                include: {
                    user: { select: { email: true, profile: { select: { fullName: true } } } }
                },
                skip,
                take: limit,
                orderBy: { occurredAt: 'desc' }
            }),
            prisma.auditLog.count({ where })
        ])

        return successResponse({
            logs,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
        })

    } catch (error) {
        console.error('List audit logs error:', error)
        return errorResponse('Failed to fetch logs', 500)
    }
}
