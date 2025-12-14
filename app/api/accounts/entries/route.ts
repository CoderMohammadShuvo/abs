import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

// GET - List entries
export async function GET(request: NextRequest) {
    try {
        const authResult = requireRole(request, [UserRole.ACCOUNTANT, UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) return authResult

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '20')
        const type = searchParams.get('type') // INCOME, EXPENSE
        const startDate = searchParams.get('startDate')
        const endDate = searchParams.get('endDate')

        const skip = (page - 1) * limit
        const where: any = {}

        if (type) where.type = type
        if (startDate || endDate) {
            where.recordedAt = {}
            if (startDate) where.recordedAt.gte = new Date(startDate)
            if (endDate) where.recordedAt.lte = new Date(endDate)
        }

        const [entries, total] = await Promise.all([
            prisma.accountEntry.findMany({
                where,
                include: {
                    user: { select: { email: true, profile: { select: { fullName: true } } } }
                },
                skip,
                take: limit,
                orderBy: { recordedAt: 'desc' }
            }),
            prisma.accountEntry.count({ where })
        ])

        return successResponse({
            entries,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
        })

    } catch (error) {
        console.error('List account entries error:', error)
        return errorResponse('Failed to fetch entries', 500)
    }
}

// POST - Create entry
const createEntrySchema = z.object({
    type: z.enum(['INCOME', 'EXPENSE']),
    amount: z.number().positive(),
    category: z.string().optional(),
    description: z.string().optional(),
    recordedAt: z.string().optional() // ISO date
})

export async function POST(request: NextRequest) {
    try {
        const authResult = requireRole(request, [UserRole.ACCOUNTANT, UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) return authResult

        const body = await request.json()
        const validation = createEntrySchema.safeParse(body)
        if (!validation.success) {
            return validationErrorResponse(
                validation.error.errors.reduce((acc, err) => {
                    acc[err.path[0]] = err.message
                    return acc
                }, {} as Record<string, string>)
            )
        }

        const data = validation.data

        const entry = await prisma.accountEntry.create({
            data: {
                userId: authResult.user.userId,
                type: data.type,
                amount: data.amount,
                category: data.category,
                description: data.description,
                recordedAt: data.recordedAt ? new Date(data.recordedAt) : new Date()
            }
        })

        return successResponse(entry, 'Entry recorded successfully', 201)

    } catch (error) {
        console.error('Create account entry error:', error)
        return errorResponse('Failed to record entry', 500)
    }
}
