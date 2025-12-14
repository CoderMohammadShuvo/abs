import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

// GET - Book details
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(id)

        let book = null
        if (isObjectId) {
            book = await prisma.book.findUnique({ where: { id } })
        } else {
            book = await prisma.book.findUnique({ where: { slug: id } })
        }

        if (!book || (book.deletedAt && !isManager(request))) {
            // Managers can see deleted books? Maybe not. Let's stick to standard soft delete hiding.
            if (!book || book.deletedAt) return notFoundResponse('Book not found')
        }

        if (book.deletedAt) return notFoundResponse('Book not found')

        return successResponse(book)

    } catch (error) {
        console.error('Get book error:', error)
        return errorResponse('Failed to fetch book', 500)
    }
}

function isManager(req: NextRequest) {
    // Helper to check if user token has manager role (simplified for read checking)
    // implementation details omitted for GET public endpoint, sticking to standard deletedAt check
    return false
}

// PUT - Update book
const updateBookSchema = z.object({
    title: z.string().min(1).optional(),
    slug: z.string().min(1).optional(),
    author: z.string().optional(),
    description: z.string().optional(),
    price: z.number().min(0).optional(),
    stock: z.number().int().min(0).optional(),
    isbn: z.string().optional(),
    coverUrl: z.string().url().optional()
})

export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireRole(request, [UserRole.SHOP_MANAGER, UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) return authResult

        const { id } = await params
        const body = await request.json()
        const validation = updateBookSchema.safeParse(body)
        if (!validation.success) {
            return validationErrorResponse(validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>))
        }

        const data = validation.data
        const existing = await prisma.book.findUnique({ where: { id } })
        if (!existing || existing.deletedAt) return notFoundResponse('Book not found')

        // Unique checks
        if (data.slug && data.slug !== existing.slug) {
            const conflict = await prisma.book.findUnique({ where: { slug: data.slug } })
            if (conflict) return errorResponse('Slug already exists', 409)
        }
        if (data.isbn && data.isbn !== existing.isbn) {
            const conflict = await prisma.book.findUnique({ where: { isbn: data.isbn } })
            if (conflict) return errorResponse('ISBN already exists', 409)
        }

        const updated = await prisma.book.update({
            where: { id },
            data
        })

        return successResponse(updated, 'Book updated')
    } catch (error) {
        console.error('Update book error:', error)
        return errorResponse('Failed to update book', 500)
    }
}

// DELETE - Remove book
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireRole(request, [UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) return authResult

        const { id } = await params
        const existing = await prisma.book.findUnique({ where: { id } })
        if (!existing || existing.deletedAt) return notFoundResponse('Book not found')

        await prisma.book.update({
            where: { id },
            data: { deletedAt: new Date() }
        })

        return successResponse(null, 'Book deleted')
    } catch (error) {
        console.error('Delete book error:', error)
        return errorResponse('Failed to delete book', 500)
    }
}
