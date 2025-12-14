import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/lib/api-response'
import { UserRole, ApplicationStatus } from '@prisma/client'

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

const statusSchema = z.object({
    status: z.nativeEnum(ApplicationStatus)
})

export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireRole(request, [UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) return authResult

        const { id } = await params
        const body = await request.json()
        const validation = statusSchema.safeParse(body)

        if (!validation.success) {
            return validationErrorResponse(
                validation.error.errors.reduce((acc, err) => {
                    acc[err.path[0]] = err.message
                    return acc
                }, {} as Record<string, string>)
            )
        }

        const existing = await prisma.consultancyRequest.findUnique({ where: { id } })
        if (!existing) return notFoundResponse('Request not found')

        const updated = await prisma.consultancyRequest.update({
            where: { id },
            data: { status: validation.data.status }
        })

        return successResponse(updated, 'Status updated successfully')

    } catch (error) {
        console.error('Update consultancy status error:', error)
        return errorResponse('Failed to update status', 500)
    }
}
