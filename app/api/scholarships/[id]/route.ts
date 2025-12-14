import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api-response'

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

// GET - Get scholarship details by id or slug
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params

        // Check if id is a valid ObjectId (hex string of 24 chars)
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(id)

        // Try finding by ID first if it looks like one, or slug
        let scholarship = null

        if (isObjectId) {
            scholarship = await prisma.scholarship.findUnique({
                where: { id },
                include: {
                    _count: {
                        select: { applications: true }
                    }
                }
            })
        }

        // If not found by ID or clearly not an ID, try slug
        if (!scholarship) {
            scholarship = await prisma.scholarship.findUnique({
                where: { slug: id },
                include: {
                    _count: {
                        select: { applications: true }
                    }
                }
            })
        }

        if (!scholarship) {
            return notFoundResponse('Scholarship not found')
        }

        return successResponse(scholarship)
    } catch (error) {
        console.error('Get scholarship error:', error)
        return errorResponse('Failed to fetch scholarship', 500)
    }
}
