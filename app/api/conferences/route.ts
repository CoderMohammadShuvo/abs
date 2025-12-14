import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-middleware'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response'

// GET - List all conferences
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const search = searchParams.get('search') || ''

        const skip = (page - 1) * limit

        const where: any = {
            OR: [
                { deletedAt: null },
                { deletedAt: { isSet: false } }
            ]
        }

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { location: { contains: search, mode: 'insensitive' } }
            ]
        }

        const [conferences, total] = await Promise.all([
            prisma.conference.findMany({
                where,
                skip,
                take: limit,
                orderBy: { eventDate: 'asc' }
            }),
            prisma.conference.count({ where })
        ])

        return successResponse({
            conferences,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('List conferences error:', error)
        return errorResponse('Failed to fetch conferences', 500)
    }
}

// POST - Create conference
const createConferenceSchema = z.object({
    title: z.string().min(3),
    slug: z.string().min(3),
    details: z.record(z.any()).optional(), // JSON
    eventDate: z.string().optional(),
    submissionDeadline: z.string().optional(),
    location: z.string().optional()
})

export async function POST(request: NextRequest) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const body = await request.json()

        const validation = createConferenceSchema.safeParse(body)
        if (!validation.success) {
            return validationErrorResponse(
                validation.error.errors.reduce((acc, err) => {
                    acc[err.path[0]] = err.message
                    return acc
                }, {} as Record<string, string>)
            )
        }

        const data = validation.data

        // Check slug uniqueness
        const existing = await prisma.conference.findUnique({
            where: { slug: data.slug }
        })
        if (existing) {
            return errorResponse('Slug already exists', 409)
        }

        const conference = await prisma.conference.create({
            data: {
                title: data.title,
                slug: data.slug,
                details: data.details || {},
                location: data.location,
                eventDate: data.eventDate ? new Date(data.eventDate) : null,
                submissionDeadline: data.submissionDeadline ? new Date(data.submissionDeadline) : null
            }
        })

        return successResponse(conference, 'Conference created successfully', 201)
    } catch (error) {
        console.error('Create conference error:', error)
        return errorResponse('Failed to create conference', 500)
    }
}
