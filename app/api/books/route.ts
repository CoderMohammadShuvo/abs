import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

// GET - List books
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const search = searchParams.get('search') || ''
        const minPrice = searchParams.get('minPrice')
        const maxPrice = searchParams.get('maxPrice')

        const skip = (page - 1) * limit
        const where: any = {
            OR: [
                { deletedAt: null },
                { deletedAt: { isSet: false } }
            ]
        }

        if (search) {
            where.AND = [
                {
                    OR: [
                        { title: { contains: search, mode: 'insensitive' } },
                        { author: { contains: search, mode: 'insensitive' } },
                        { isbn: { contains: search, mode: 'insensitive' } }
                    ]
                }
            ]
        }

        if (minPrice) {
            where.price = { ...where.price, gte: parseFloat(minPrice) }
        }
        if (maxPrice) {
            where.price = { ...where.price, lte: parseFloat(maxPrice) }
        }

        const [books, total] = await Promise.all([
            prisma.book.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.book.count({ where })
        ])

        return successResponse({
            books,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('List books error:', error)
        return errorResponse('Failed to fetch books', 500)
    }
}

// POST - Add book
const createBookSchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1),
    author: z.string().optional(),
    description: z.string().optional(),
    price: z.number().min(0),
    stock: z.number().int().min(0).default(0),
    isbn: z.string().optional(),
    coverUrl: z.string().url().optional()
})

export async function POST(request: NextRequest) {
    try {
        const authResult = requireRole(request, [UserRole.SHOP_MANAGER, UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) {
            return authResult
        }

        const body = await request.json()
        const validation = createBookSchema.safeParse(body)
        if (!validation.success) {
            return validationErrorResponse(
                validation.error.errors.reduce((acc, err) => {
                    acc[err.path[0]] = err.message
                    return acc
                }, {} as Record<string, string>)
            )
        }

        const data = validation.data

        // Check unique slug
        const existingSlug = await prisma.book.findUnique({ where: { slug: data.slug } })
        if (existingSlug) return errorResponse('Slug already exists', 409)

        // Check unique ISBN if provided
        if (data.isbn) {
            const existingIsbn = await prisma.book.findUnique({ where: { isbn: data.isbn } })
            if (existingIsbn) return errorResponse('ISBN already exists', 409)
        }

        const book = await prisma.book.create({
            data: {
                title: data.title,
                slug: data.slug,
                author: data.author,
                description: data.description,
                price: data.price,
                stock: data.stock,
                isbn: data.isbn,
                coverUrl: data.coverUrl
            }
        })

        return successResponse(book, 'Book created successfully', 201)

    } catch (error) {
        console.error('Create book error:', error)
        return errorResponse('Failed to create book', 500)
    }
}
