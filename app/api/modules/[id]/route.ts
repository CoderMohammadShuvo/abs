import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api-response'

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

// GET - Get module details
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params

        const module = await prisma.courseModule.findUnique({
            where: { id },
            include: {
                courseContents: {
                    orderBy: { order: 'asc' }
                }
            }
        })

        if (!module) {
            return notFoundResponse('Module not found')
        }

        return successResponse(module)
    } catch (error) {
        console.error('Get module error:', error)
        return errorResponse('Failed to fetch module', 500)
    }
}
