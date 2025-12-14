import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/lib/api-response'

interface RouteParams {
    params: Promise<{
        slug: string
    }>
}

// GET - View single journal by slug (public access)
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { slug } = await params

        const journal = await prisma.journal.findUnique({
            where: { slug },
            include: {
                articles: {
                    where: { deletedAt: null },
                    orderBy: { publishedDate: 'desc' },
                    take: 10
                },
                _count: {
                    select: {
                        articles: true
                    }
                }
            }
        })

        if (!journal || journal.deletedAt) {
            return notFoundResponse('Journal not found')
        }

        return successResponse(journal)
    } catch (error) {
        console.error('Get journal error:', error)
        return errorResponse('Failed to fetch journal', 500)
    }
}

// PUT - Update journal info (admin only, works with both slug and ID)
const updateJournalSchema = z.object({
    title: z.string().min(3).optional(),
    slug: z.string().min(3).optional(),
    description: z.string().optional(),
    publisher: z.string().optional(),
    issn: z.string().optional(),
    eissn: z.string().optional(),
    websiteUrl: z.string().url().optional(),
    apiUrl: z.string().url().optional(),
    coverImageUrl: z.string().url().optional()
})

export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { slug } = await params
        const body = await request.json()

        // Validate input
        const validation = updateJournalSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const data = validation.data

        // Find journal by slug or ID
        const existingJournal = await prisma.journal.findFirst({
            where: {
                OR: [
                    { slug },
                    { id: slug }
                ]
            }
        })

        if (!existingJournal || existingJournal.deletedAt) {
            return notFoundResponse('Journal not found')
        }

        // If slug is being updated, check for conflicts
        if (data.slug && data.slug !== existingJournal.slug) {
            const slugConflict = await prisma.journal.findUnique({
                where: { slug: data.slug }
            })

            if (slugConflict) {
                return errorResponse('Journal with this slug already exists', 409)
            }
        }

        // Update journal
        const journal = await prisma.journal.update({
            where: { id: existingJournal.id },
            data
        })

        return successResponse(journal, 'Journal updated successfully')
    } catch (error) {
        console.error('Update journal error:', error)
        return errorResponse('Failed to update journal', 500)
    }
}

// DELETE - Delete journal (admin only, works with both slug and ID)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { slug } = await params

        // Find journal by slug or ID
        const existingJournal = await prisma.journal.findFirst({
            where: {
                OR: [
                    { slug },
                    { id: slug }
                ]
            }
        })

        if (!existingJournal || existingJournal.deletedAt) {
            return notFoundResponse('Journal not found')
        }

        // Soft delete journal
        await prisma.journal.update({
            where: { id: existingJournal.id },
            data: {
                deletedAt: new Date()
            }
        })

        return successResponse(null, 'Journal deleted successfully')
    } catch (error) {
        console.error('Delete journal error:', error)
        return errorResponse('Failed to delete journal', 500)
    }
}
