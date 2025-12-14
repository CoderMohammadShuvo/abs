import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/lib/api-response'

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

// GET - Article details
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params

        const article = await prisma.article.findUnique({
            where: { id },
            include: {
                journal: true
            }
        })

        if (!article || article.deletedAt) {
            return notFoundResponse('Article not found')
        }

        return successResponse(article)
    } catch (error) {
        console.error('Get article error:', error)
        return errorResponse('Failed to fetch article', 500)
    }
}

// PUT - Update article
const updateArticleSchema = z.object({
    title: z.string().min(3).optional(),
    abstract: z.string().optional(),
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

export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params
        const body = await request.json()

        // Validate input
        const validation = updateArticleSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const { publishedDate, ...data } = validation.data

        // Check if article exists
        const existingArticle = await prisma.article.findUnique({
            where: { id }
        })

        if (!existingArticle || existingArticle.deletedAt) {
            return notFoundResponse('Article not found')
        }

        // Update article
        const updateData: any = { ...data }
        if (publishedDate !== undefined) {
            updateData.publishedDate = publishedDate ? new Date(publishedDate) : null
        }

        const article = await prisma.article.update({
            where: { id },
            data: updateData,
            include: {
                journal: true
            }
        })

        return successResponse(article, 'Article updated successfully')
    } catch (error) {
        console.error('Update article error:', error)
        return errorResponse('Failed to update article', 500)
    }
}

// DELETE - Remove article
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params

        // Check if article exists
        const existingArticle = await prisma.article.findUnique({
            where: { id }
        })

        if (!existingArticle || existingArticle.deletedAt) {
            return notFoundResponse('Article not found')
        }

        // Soft delete article
        await prisma.article.update({
            where: { id },
            data: {
                deletedAt: new Date()
            }
        })

        return successResponse(null, 'Article deleted successfully')
    } catch (error) {
        console.error('Delete article error:', error)
        return errorResponse('Failed to delete article', 500)
    }
}
