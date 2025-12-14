import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'
import { MediaOwnerType } from '@prisma/client'

interface RouteParams {
    params: Promise<{
        type: string
        id: string
    }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { type, id } = await params

        // Validate OwnerType
        const ownerType = type.toUpperCase() as MediaOwnerType
        if (!Object.values(MediaOwnerType).includes(ownerType)) {
            return errorResponse('Invalid owner type', 400)
        }

        // Validate ID
        if (!/^[0-9a-fA-F]{24}$/.test(id)) return errorResponse('Invalid ID format', 400)

        const media = await prisma.media.findMany({
            where: {
                ownerId: id,
                ownerType: ownerType
            },
            orderBy: { uploadedAt: 'desc' }
        })

        return successResponse(media)

    } catch (error) {
        console.error('List media by owner error:', error)
        return errorResponse('Failed to fetch media', 500)
    }
}
