import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-middleware'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response'

// GET - Search articles
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const search = searchParams.get('search') || ''
        const journalId = searchParams.get('journalId') || ''
        const volume = searchParams.get('volume') || ''
        const issue = searchParams.get('issue') || ''
        const year = searchParams.get('year') || ''

        const skip = (page - 1) * limit

        // Build where clause
        const where: any = {
            deletedAt: null
        }

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { abstract: { contains: search, mode: 'insensitive' } },
                { keywords: { hasSome: [search] } }
            ]
        }

        if (journalId) {
            where.journalId = journalId
        }

        if (volume) {
            where.volume = volume
        }

        if (issue) {
            where.issue = issue
        }

        if (year) {
            const yearInt = parseInt(year)
            where.publishedDate = {
                gte: new Date(`${yearInt}-01-01`),
                lte: new Date(`${yearInt}-12-31`)
            }
        }

        // Fetch articles and total count
        const [articles, total] = await Promise.all([
            prisma.article.findMany({
                where,
                include: {
                    journal: {
                        select: {
                            id: true,
                            title: true,
                            slug: true,
                            publisher: true
                        }
                    }
                },
                skip,
                take: limit,
                orderBy: { publishedDate: 'desc' }
            }),
            prisma.article.count({ where })
        ])

        return successResponse({
            articles,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('Search articles error:', error)
        return errorResponse('Failed to search articles', 500)
    }
}

// POST - Add manual article
const createArticleSchema = z.object({
    title: z.string().min(3),
    abstract: z.string().optional(),
    journalId: z.string().min(1),
    authors: z.array(z.string()).optional(),
    doi: z.string().optional(),
    volume: z.string().optional(),
    issue: z.string().optional(),
    pages: z.string().optional(),
    publishedDate: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    pdfUrl: z.string().url().optional(),
    externalUrl: z.string().url().optional()
})

export async function POST(request: NextRequest) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const body = await request.json()

        // Validate input
        const validation = createArticleSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const { publishedDate, ...data } = validation.data

        // Check if journal exists
        const journal = await prisma.journal.findUnique({
            where: { id: data.journalId }
        })

        if (!journal || journal.deletedAt) {
            return errorResponse('Journal not found', 404)
        }

        // Create article
        const article = await prisma.article.create({
            data: {
                ...data,
                publishedDate: publishedDate ? new Date(publishedDate) : null
            },
            include: {
                journal: true
            }
        })

        return successResponse(article, 'Article created successfully', 201)
    } catch (error) {
        console.error('Create article error:', error)
        return errorResponse('Failed to create article', 500)
    }
}
