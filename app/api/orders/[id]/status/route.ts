import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/lib/api-response'
import { UserRole, OrderStatus } from '@prisma/client'

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

const statusSchema = z.object({
    status: z.nativeEnum(OrderStatus)
})

export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireRole(request, [UserRole.SHOP_MANAGER, UserRole.ADMIN, UserRole.SUPER_ADMIN])
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

        const { status } = validation.data

        const order = await prisma.order.findUnique({ where: { id } })
        if (!order) return notFoundResponse('Order not found')

        const updated = await prisma.order.update({
            where: { id },
            data: { status }
        })

        return successResponse(updated, 'Order status updated')

    } catch (error) {
        console.error('Update order status error:', error)
        return errorResponse('Failed to update status', 500)
    }
}
