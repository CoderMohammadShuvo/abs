import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse } from '@/lib/api-response'

export async function GET(request: NextRequest) {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' },
            include: {
                children: true
            }
        })

        return successResponse(categories)
    } catch (error) {
        console.error('List categories error:', error)
        return errorResponse('Failed to fetch categories', 500)
    }
}
