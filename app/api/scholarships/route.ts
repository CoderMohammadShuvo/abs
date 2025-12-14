import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-middleware'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response'

// GET - List active scholarships
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const search = searchParams.get('search') || ''
        const type = searchParams.get('type') || ''

        const skip = (page - 1) * limit

        // Build where clause
        const where: any = {
            isActive: true
        }

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { eligibilitySummary: { contains: search, mode: 'insensitive' } }
            ]
        }

        if (type) {
            where.type = type
        }

        // Fetch scholarships and total count
        const [scholarships, total] = await Promise.all([
            prisma.scholarship.findMany({
                where,
                include: {
                    _count: {
                        select: {
                            applications: true
                        }
                    }
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.scholarship.count({ where })
        ])

        return successResponse({
            scholarships,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('List scholarships error:', error)
        return errorResponse('Failed to fetch scholarships', 500)
    }
}

// POST - Create scholarship
const createScholarshipSchema = z.object({
    title: z.string().min(3),
    slug: z.string().min(3),
    eligibility: z.record(z.any()), // JSON
    eligibilitySummary: z.string().optional(),
    applicationDetails: z.record(z.any()), // JSON
    isActive: z.boolean().optional().default(true)
})

export async function POST(request: NextRequest) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const body = await request.json()

        // Validate input
        const validation = createScholarshipSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const data = validation.data

        // Check if slug already exists
        const existingScholarship = await prisma.scholarship.findUnique({
            where: { slug: data.slug }
        })

        if (existingScholarship) {
            return errorResponse('Scholarship with this slug already exists', 409)
        }

        // Create scholarship
        const scholarship = await prisma.scholarship.create({
            data
        })

        return successResponse(scholarship, 'Scholarship created successfully', 201)
    } catch (error) {
        console.error('Create scholarship error:', error)
        return errorResponse('Failed to create scholarship', 500)
    }
}
