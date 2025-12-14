import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-middleware'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response'

// GET - List all categories
export async function GET(request: NextRequest) {
    try {
        const where: any = {}

        const categories = await prisma.category.findMany({
            where,
            include: {
                parent: true,
                children: true,
                _count: {
                    select: {
                        courseLinks: true,
                        journalLinks: true,
                        blogLinks: true,
                        bookLinks: true
                    }
                }
            },
            orderBy: { name: 'asc' }
        })

        return successResponse(categories)
    } catch (error) {
        console.error('List categories error:', error)
        return errorResponse('Failed to fetch categories', 500)
    }
}

// POST - Create new category
const createCategorySchema = z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
    description: z.string().optional(),
    parentId: z.string().optional()
})

export async function POST(request: NextRequest) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const body = await request.json()

        // Validate input
        const validation = createCategorySchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const { name, slug, description, parentId } = validation.data

        // Check if slug exists
        const existingCategory = await prisma.category.findFirst({
            where: { slug }
        })

        if (existingCategory) {
            return errorResponse('Category with this slug already exists', 409)
        }

        // Create category
        const category = await prisma.category.create({
            data: {
                name,
                slug,
                description,
                parentId
            },
            include: {
                parent: true,
                children: true
            }
        })

        return successResponse(category, 'Category created successfully', 201)
    } catch (error) {
        console.error('Create category error:', error)
        return errorResponse('Failed to create category', 500)
    }
}
