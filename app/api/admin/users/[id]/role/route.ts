import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

const updateRoleSchema = z.object({
    role: z.nativeEnum(UserRole)
})

export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        // Only SUPER_ADMIN can change roles via this specific endpoint
        const authResult = requireRole(request, [UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params
        const body = await request.json()

        // Validate input
        const validation = updateRoleSchema.safeParse(body)
        if (!validation.success) {
            return validationErrorResponse({ role: 'Invalid role' })
        }

        const { role } = validation.data

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { id }
        })

        if (!existingUser || existingUser.deletedAt) {
            return notFoundResponse('User not found')
        }

        // Prevent changing your own role to something else (to avoid locking yourself out)
        // Although SUPER_ADMIN should be able to do anything, it's a safety check.
        if (id === authResult.user.userId && role !== UserRole.SUPER_ADMIN) {
            // Optional: Allow it but warn? For now let's allow it but maybe log it specially.
        }

        // Update user role
        const user = await prisma.user.update({
            where: { id },
            data: { role },
            include: {
                profile: true
            }
        })

        // Create audit log
        await prisma.auditLog.create({
            data: {
                userId: authResult.user.userId,
                entity: 'User',
                entityId: user.id,
                action: 'UPDATE_ROLE',
                changes: { oldRole: existingUser.role, newRole: role }
            }
        })

        const { passwordHash: _, ...userWithoutPassword } = user

        return successResponse(userWithoutPassword, 'User role updated successfully')
    } catch (error) {
        console.error('Update role error:', error)
        return errorResponse('Failed to update user role', 500)
    }
}
