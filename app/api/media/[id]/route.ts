import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params
        if (!/^[0-9a-fA-F]{24}$/.test(id)) return errorResponse('Invalid ID format', 400)

        const media = await prisma.media.findUnique({
            where: { id },
            include: {
                uploadedBy: {
                    select: {
                        email: true,
                        profile: { select: { fullName: true } }
                    }
                }
            }
        })

        if (!media) return notFoundResponse('Media not found')
        return successResponse(media)
    } catch (error) {
        console.error('Get media error:', error)
        return errorResponse('Failed to fetch media', 500)
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireRole(request, [UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) return authResult

        const { id } = await params
        const media = await prisma.media.findUnique({ where: { id } })

        if (!media) return notFoundResponse('Media not found')

        // Here we would also delete from Cloudinary/S3

        await prisma.media.delete({ where: { id } })

        return successResponse(null, 'Media deleted successfully')

    } catch (error) {
        console.error('Delete media error:', error)
        return errorResponse('Failed to delete media', 500)
    }
}
