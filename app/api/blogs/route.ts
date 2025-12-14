import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response'
import { UserRole, BlogType } from '@prisma/client'

// GET - List blogs/news
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const search = searchParams.get('search') || ''
        const type = searchParams.get('type') // BLOG or NEWS
        const tag = searchParams.get('tag')

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
                { content: { contains: search, mode: 'insensitive' } }
            ]
        }

        if (type && Object.values(BlogType).includes(type as BlogType)) {
            where.type = type
        }

        if (tag) {
            where.tags = { has: tag }
        }

        const [blogs, total] = await Promise.all([
            prisma.blogPost.findMany({
                where,
                include: {
                    author: {
                        select: { email: true, profile: { select: { fullName: true } } }
                    },
                    _count: {
                        select: { comments: true }
                    }
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.blogPost.count({ where })
        ])

        return successResponse({
            blogs,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('List blogs error:', error)
        return errorResponse('Failed to fetch blogs', 500)
    }
}

// POST - Create blog
const createBlogSchema = z.object({
    title: z.string().min(3),
    slug: z.string().min(3),
    type: z.nativeEnum(BlogType).default('BLOG'),
    content: z.string().min(10),
    tags: z.array(z.string()).optional(),
    thumbnail: z.string().url().optional(),
    publishedAt: z.string().optional()
})

export async function POST(request: NextRequest) {
    try {
        // ADMIN or TEACHER
        const authResult = requireRole(request, [UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.TEACHER])
        if (authResult instanceof Response) {
            return authResult
        }

        const body = await request.json()

        const validation = createBlogSchema.safeParse(body)
        if (!validation.success) {
            return validationErrorResponse(
                validation.error.errors.reduce((acc, err) => {
                    acc[err.path[0]] = err.message
                    return acc
                }, {} as Record<string, string>)
            )
        }

        const data = validation.data

        // Check slug
        const existing = await prisma.blogPost.findUnique({
            where: { slug: data.slug }
        })
        if (existing) {
            return errorResponse('Slug already exists', 409)
        }

        const blog = await prisma.blogPost.create({
            data: {
                title: data.title,
                slug: data.slug,
                type: data.type,
                content: data.content,
                tags: data.tags || [],
                thumbnail: data.thumbnail,
                publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(), // Default to now if not provided
                authorId: authResult.user.userId
            }
        })

        return successResponse(blog, 'Blog post created successfully', 201)

    } catch (error) {
        console.error('Create blog error:', error)
        return errorResponse('Failed to create blog post', 500)
    }
}
