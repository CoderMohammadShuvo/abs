import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/password'
import { requireAdmin } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse, validationErrorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

// GET - Get user by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params

        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                profile: true,
                enrollments: {
                    include: {
                        course: true
                    }
                },
                orders: true,
                _count: {
                    select: {
                        enrollments: true,
                        orders: true,
                        blogsAuthored: true
                    }
                }
            }
        })

        if (!user || user.deletedAt) {
            return notFoundResponse('User not found')
        }

        const { passwordHash: _, ...userWithoutPassword } = user

        return successResponse(userWithoutPassword)
    } catch (error) {
        console.error('Get user error:', error)
        return errorResponse('Failed to fetch user', 500)
    }
}

// PATCH - Update user
const updateUserSchema = z.object({
    email: z.string().email().optional(),
    fullName: z.string().min(2).optional(),
    role: z.nativeEnum(UserRole).optional(),
    isActive: z.boolean().optional(),
    password: z.string().min(8).optional(),
    bio: z.string().optional(),
    contactNumber: z.string().optional(),
    gender: z.string().optional(),
    dateOfBirth: z.string().optional()
})

export async function PATCH(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params
        const body = await request.json()

        // Validate input
        const validation = updateUserSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const data = validation.data

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { id }
        })

        if (!existingUser || existingUser.deletedAt) {
            return notFoundResponse('User not found')
        }

        // If email is being changed, check for conflicts
        if (data.email && data.email !== existingUser.email) {
            const emailExists = await prisma.user.findUnique({
                where: { email: data.email }
            })

            if (emailExists) {
                return errorResponse('Email already in use', 409)
            }
        }

        // Prepare update data
        const updateData: any = {}
        const profileUpdateData: any = {}

        if (data.email) updateData.email = data.email
        if (data.role) updateData.role = data.role
        if (data.isActive !== undefined) updateData.isActive = data.isActive

        if (data.password) {
            updateData.passwordHash = await hashPassword(data.password)
            updateData.lastPasswordChange = new Date()
        }

        if (data.fullName) profileUpdateData.fullName = data.fullName
        if (data.bio) profileUpdateData.bio = data.bio
        if (data.contactNumber) profileUpdateData.contactNumber = data.contactNumber
        if (data.gender) profileUpdateData.gender = data.gender
        if (data.dateOfBirth) profileUpdateData.dateOfBirth = new Date(data.dateOfBirth)
        if (data.isActive !== undefined) {
            profileUpdateData.status = data.isActive ? 'active' : 'inactive'
        }

        // Update user and profile
        const user = await prisma.user.update({
            where: { id },
            data: {
                ...updateData,
                ...(Object.keys(profileUpdateData).length > 0 && {
                    profile: {
                        update: profileUpdateData
                    }
                })
            },
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
                action: 'UPDATE',
                changes: { ...updateData, ...profileUpdateData }
            }
        })

        const { passwordHash: _, ...userWithoutPassword } = user

        return successResponse(userWithoutPassword, 'User updated successfully')
    } catch (error) {
        console.error('Update user error:', error)
        return errorResponse('Failed to update user', 500)
    }
}

// PUT - Update user (Alias for PATCH)
export async function PUT(request: NextRequest, { params }: RouteParams) {
    return PATCH(request, { params })
}

// DELETE - Soft delete user
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { id } = await params

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { id }
        })

        if (!existingUser || existingUser.deletedAt) {
            return notFoundResponse('User not found')
        }

        // Prevent deleting yourself
        if (id === authResult.user.userId) {
            return errorResponse('Cannot delete your own account', 400)
        }

        // Soft delete user
        await prisma.user.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                isActive: false
            }
        })

        // Create audit log
        await prisma.auditLog.create({
            data: {
                userId: authResult.user.userId,
                entity: 'User',
                entityId: id,
                action: 'DELETE'
            }
        })

        return successResponse(null, 'User deleted successfully')
    } catch (error) {
        console.error('Delete user error:', error)
        return errorResponse('Failed to delete user', 500)
    }
}
