import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAuth, requireRole, requireAdmin } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/lib/api-response'
import { UserRole, BlogType } from '@prisma/client'

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

// GET - Get blog details
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(id)

        let blog = null

        // Count view
        // Note: For high traffic, this should be optimized (e.g. separate counter or background job)
        // For now, we will increment viewCount on GET (basic implementation)

        const where = isObjectId ? { id } : { slug: id }

        blog = await prisma.blogPost.findUnique({
            where: where as any,
            include: {
                author: {
                    select: { email: true, profile: { select: { fullName: true, avatarUrl: true } } }
                }
            }
        })

        if (!blog || blog.deletedAt) {
            return notFoundResponse('Blog post not found')
        }

        // Increment view count (fire and forget for performance?)
        // Better to await to ensure correctness if showing exact count, or just do it in background
        await prisma.blogPost.update({
            where: { id: blog.id },
            data: { viewCount: { increment: 1 } }
        })

        return successResponse(blog)
    } catch (error) {
        console.error('Get blog error:', error)
        return errorResponse('Failed to fetch blog post', 500)
    }
}

// PUT - Update blog
const updateBlogSchema = z.object({
    title: z.string().min(3).optional(),
    slug: z.string().min(3).optional(),
    type: z.nativeEnum(BlogType).optional(),
    content: z.string().min(10).optional(),
    tags: z.array(z.string()).optional(),
    thumbnail: z.string().url().optional(),
    publishedAt: z.string().optional()
})

export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        // Author, Admin, Teacher
        const authResult = requireAuth(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params
        const body = await request.json()

        const validation = updateBlogSchema.safeParse(body)
        if (!validation.success) {
            return validationErrorResponse(
                validation.error.errors.reduce((acc, err) => {
                    acc[err.path[0]] = err.message
                    return acc
                }, {} as Record<string, string>)
            )
        }

        const data = validation.data

        const existing = await prisma.blogPost.findUnique({ where: { id } })
        if (!existing || existing.deletedAt) return notFoundResponse('Blog post not found')

        // Check ownership
        const isAuthor = existing.authorId === authResult.user.userId
        const isAdmin = authResult.user.role === UserRole.ADMIN || authResult.user.role === UserRole.SUPER_ADMIN
        const isTeacher = authResult.user.role === UserRole.TEACHER // Teachers can define updating rules, assuming they can update own

        if (!isAuthor && !isAdmin) {
            return errorResponse('Access denied. You can only edit your own posts.', 403)
        }

        // Check slug uniqueness if changing
        if (data.slug && data.slug !== existing.slug) {
            const conflict = await prisma.blogPost.findUnique({ where: { slug: data.slug } })
            if (conflict) return errorResponse('Slug already exists', 409)
        }

        const updatedBlog = await prisma.blogPost.update({
            where: { id },
            data: {
                title: data.title,
                slug: data.slug,
                type: data.type,
                content: data.content,
                tags: data.tags,
                thumbnail: data.thumbnail,
                publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
            }
        })

        return successResponse(updatedBlog, 'Blog post updated successfully')

    } catch (error) {
        console.error('Update blog error:', error)
        return errorResponse('Failed to update blog post', 500)
    }
}

// DELETE - Soft delete blog
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params

        const existing = await prisma.blogPost.findUnique({ where: { id } })
        if (!existing || existing.deletedAt) return notFoundResponse('Blog post not found')

        await prisma.blogPost.update({
            where: { id },
            data: { deletedAt: new Date() }
        })

        return successResponse(null, 'Blog post deleted successfully')

    } catch (error) {
        console.error('Delete blog error:', error)
        return errorResponse('Failed to delete blog post', 500)
    }
}
