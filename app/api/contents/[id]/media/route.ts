import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api-response'

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

// GET - List media for content
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params

        const media = await prisma.media.findMany({
            // @ts-ignore
            where: { contentId: id }
        })

        return successResponse(media)
    } catch (error) {
        console.error('Get media error:', error)
        return errorResponse('Failed to fetch media', 500)
    }
}
