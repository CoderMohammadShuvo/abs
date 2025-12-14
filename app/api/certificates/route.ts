
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

// GET - List all certificates (Admin)
export async function GET(request: NextRequest) {
    try {
        const authResult = requireRole(request, [UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) {
            return authResult
        }

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const search = searchParams.get('search') || ''

        const skip = (page - 1) * limit

        const where: any = {}

        // TODO: Search by user name or course title if search is provided
        // Since certificate has relations, we might need to filter on relations or stored fields.
        // Schema has relations to User and Course.
        if (search) {
            // Complex filtering on relations isn't always easy in one query with safe types,
            // but we can try filtering by certId matches at least
            where.certId = { contains: search, mode: 'insensitive' }
        }

        const [certificates, total] = await Promise.all([
            prisma.certificate.findMany({
                where,
                include: {
                    user: {
                        include: {
                            profile: true
                        }
                    },
                    course: true
                },
                skip,
                take: limit,
                orderBy: { issuedAt: 'desc' }
            }),
            prisma.certificate.count({ where })
        ])

        return successResponse({
            certificates,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })

    } catch (error) {
        console.error('List certificates error:', error)
        return errorResponse('Failed to fetch certificates', 500)
    }
}
