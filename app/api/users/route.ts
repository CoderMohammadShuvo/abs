import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

// GET - List Users
export async function GET(request: NextRequest) {
    try {
        const authResult = requireRole(request, [UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) return authResult

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '20')
        const search = searchParams.get('search') || ''
        const role = searchParams.get('role')

        const skip = (page - 1) * limit
        const where: any = {}

        if (search) {
            where.OR = [
                { email: { contains: search, mode: 'insensitive' } },
                { profile: { fullName: { contains: search, mode: 'insensitive' } } }
            ]
        }

        if (role && Object.values(UserRole).includes(role as UserRole)) {
            where.role = role
        }

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                select: {
                    id: true,
                    email: true,
                    role: true,
                    createdAt: true,
                    profile: {
                        select: { fullName: true, avatarUrl: true }
                    }
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.user.count({ where })
        ])

        return successResponse({
            users,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
        })

    } catch (error) {
        console.error('List users error:', error)
        return errorResponse('Failed to fetch users', 500)
    }
}
