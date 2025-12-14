import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/lib/api-response'

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

// GET - Get conference details (by ID or Slug)
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(id)

        let conference = null
        if (isObjectId) {
            conference = await prisma.conference.findUnique({
                where: { id }
            })
        }

        if (!conference) {
            conference = await prisma.conference.findUnique({
                where: { slug: id }
            })
        }

        if (!conference || conference.deletedAt) {
            return notFoundResponse('Conference not found')
        }

        return successResponse(conference)
    } catch (error) {
        console.error('Get conference error:', error)
        return errorResponse('Failed to fetch conference', 500)
    }
}

// PUT - Update conference
const updateConferenceSchema = z.object({
    title: z.string().min(3).optional(),
    slug: z.string().min(3).optional(),
    details: z.record(z.any()).optional(),
    eventDate: z.string().optional(),
    submissionDeadline: z.string().optional(),
    location: z.string().optional()
})

export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params
        const body = await request.json()

        const validation = updateConferenceSchema.safeParse(body)
        if (!validation.success) {
            return validationErrorResponse(
                validation.error.errors.reduce((acc, err) => {
                    acc[err.path[0]] = err.message
                    return acc
                }, {} as Record<string, string>)
            )
        }

        const data = validation.data

        // Prepare update data
        const updateData: any = { ...data }
        if (data.eventDate) updateData.eventDate = new Date(data.eventDate)
        if (data.submissionDeadline) updateData.submissionDeadline = new Date(data.submissionDeadline)

        // Check exists
        const existing = await prisma.conference.findUnique({ where: { id } })
        if (!existing || existing.deletedAt) return notFoundResponse('Conference not found')

        // Check slug uniqueness if changing
        if (data.slug && data.slug !== existing.slug) {
            const conflict = await prisma.conference.findUnique({ where: { slug: data.slug } })
            if (conflict) return errorResponse('Slug already exists', 409)
        }

        const conference = await prisma.conference.update({
            where: { id },
            data: updateData
        })

        return successResponse(conference, 'Conference updated successfully')
    } catch (error) {
        console.error('Update conference error:', error)
        return errorResponse('Failed to update conference', 500)
    }
}

// DELETE - Soft delete conference
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params

        const existing = await prisma.conference.findUnique({ where: { id } })
        if (!existing || existing.deletedAt) return notFoundResponse('Conference not found')

        await prisma.conference.update({
            where: { id },
            data: { deletedAt: new Date() }
        })

        return successResponse(null, 'Conference deleted successfully')
    } catch (error) {
        console.error('Delete conference error:', error)
        return errorResponse('Failed to delete conference', 500)
    }
}
