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

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireRole(request, [UserRole.ACCOUNTANT, UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) return authResult

        const { id } = await params

        const entry = await prisma.accountEntry.findUnique({ where: { id } })
        if (!entry) return notFoundResponse('Entry not found')

        await prisma.accountEntry.delete({
            where: { id }
        })

        return successResponse(null, 'Entry deleted successfully')

    } catch (error) {
        console.error('Delete account entry error:', error)
        return errorResponse('Failed to delete entry', 500)
    }
}
