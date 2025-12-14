import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/lib/api-response'

interface RouteParams {
    params: Promise<{
        id: string // Blog ID
    }>
}

// GET - List comments for a blog
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '20')
        const skip = (page - 1) * limit

        const comments = await prisma.blogComment.findMany({
            where: { blogPostId: id },
            include: {
                user: {
                    select: {
                        email: true,
                        profile: { select: { fullName: true, avatarUrl: true } }
                    }
                }
            },
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' }
        })

        return successResponse({ comments })
    } catch (error) {
        console.error('List comments error:', error)
        return errorResponse('Failed to fetch comments', 500)
    }
}

// POST - Add comment
const createCommentSchema = z.object({
    content: z.string().min(1).max(1000)
})

export async function POST(request: NextRequest, { params }: RouteParams) {
    try {
        // Auth required (Student, Visitor? Visitor needs auth? Assuming registered user for now as Visitor usually means Role.VISITOR)
        const authResult = requireAuth(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params
        const body = await request.json()

        const validation = createCommentSchema.safeParse(body)
        if (!validation.success) {
            return validationErrorResponse({ content: 'Invalid comment content' })
        }

        const blog = await prisma.blogPost.findUnique({
            where: { id },
            select: { id: true, deletedAt: true }
        })

        if (!blog || blog.deletedAt) {
            return notFoundResponse('Blog post not found')
        }

        const comment = await prisma.blogComment.create({
            data: {
                blogPostId: id,
                userId: authResult.user.userId,
                content: validation.data.content
            },
            include: {
                user: {
                    select: {
                        email: true,
                        profile: { select: { fullName: true, avatarUrl: true } }
                    }
                }
            }
        })

        return successResponse(comment, 'Comment added successfully', 201)

    } catch (error) {
        console.error('Add comment error:', error)
        return errorResponse('Failed to add comment', 500)
    }
}
