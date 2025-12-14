import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-middleware'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response'

// GET - List all journals
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const search = searchParams.get('search') || ''

        const skip = (page - 1) * limit

        // Build where clause
        const where: any = {
            deletedAt: null
        }

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { publisher: { contains: search, mode: 'insensitive' } },
                { issn: { contains: search, mode: 'insensitive' } }
            ]
        }

        // Fetch journals and total count
        const [journals, total] = await Promise.all([
            prisma.journal.findMany({
                where,
                include: {
                    _count: {
                        select: {
                            articles: true
                        }
                    }
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.journal.count({ where })
        ])

        return successResponse({
            journals,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('List journals error:', error)
        return errorResponse('Failed to fetch journals', 500)
    }
}

// POST - Create journal
const createJournalSchema = z.object({
    title: z.string().min(3),
    slug: z.string().min(3),
    description: z.string().optional(),
    publisher: z.string().optional(),
    issn: z.string().optional(),
    eissn: z.string().optional(),
    websiteUrl: z.string().url().optional(),
    apiUrl: z.string().url().optional(),
    coverImageUrl: z.string().url().optional()
})

export async function POST(request: NextRequest) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const body = await request.json()

        // Validate input
        const validation = createJournalSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const data = validation.data

        // Check if slug already exists
        const existingJournal = await prisma.journal.findUnique({
            where: { slug: data.slug }
        })

        if (existingJournal) {
            return errorResponse('Journal with this slug already exists', 409)
        }

        // Create journal
        const journal = await prisma.journal.create({
            data
        })

        return successResponse(journal, 'Journal created successfully', 201)
    } catch (error) {
        console.error('Create journal error:', error)
        return errorResponse('Failed to create journal', 500)
    }
}
