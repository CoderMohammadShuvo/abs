import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth-middleware'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response'

const updateProfileSchema = z.object({
    fullName: z.string().min(2).optional(),
    bio: z.string().optional(),
    contactNumber: z.string().optional(),
    gender: z.string().optional(),
    dateOfBirth: z.string().optional(),
    address: z.string().optional(),
    socialLinks: z.record(z.string()).optional(),
    skills: z.array(z.string()).optional()
})

// GET - Get current user profile (Alias for /auth/me but more specific to profile)
export async function GET(request: NextRequest) {
    try {
        const authResult = requireAuth(request)
        if (authResult instanceof Response) return authResult

        const { user: tokenUser } = authResult

        const user = await prisma.user.findUnique({
            where: { id: tokenUser.userId },
            include: {
                profile: true
            }
        })

        if (!user) return errorResponse('User not found', 404)

        const { passwordHash: _, ...userWithoutPassword } = user

        return successResponse(userWithoutPassword)
    } catch (error) {
        return errorResponse('Failed to fetch profile', 500)
    }
}

// PUT - Update user profile
export async function PUT(request: NextRequest) {
    try {
        const authResult = requireAuth(request)
        if (authResult instanceof Response) return authResult

        const body = await request.json()

        const validation = updateProfileSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const data = validation.data
        const userId = authResult.user.userId

        // Prepare update data
        const profileUpdateData: any = {}
        if (data.fullName) profileUpdateData.fullName = data.fullName
        if (data.bio) profileUpdateData.bio = data.bio
        if (data.contactNumber) profileUpdateData.contactNumber = data.contactNumber
        if (data.gender) profileUpdateData.gender = data.gender
        if (data.dateOfBirth) profileUpdateData.dateOfBirth = new Date(data.dateOfBirth)
        if (data.address) profileUpdateData.address = data.address
        if (data.socialLinks) profileUpdateData.socialLinks = data.socialLinks
        if (data.skills) profileUpdateData.skills = data.skills

        // Update user profile
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                profile: {
                    upsert: {
                        create: {
                            fullName: data.fullName || 'User',
                            ...profileUpdateData
                        },
                        update: profileUpdateData
                    }
                }
            },
            include: {
                profile: true
            }
        })

        const { passwordHash: _, ...userWithoutPassword } = user

        return successResponse(userWithoutPassword, 'Profile updated successfully')
    } catch (error) {
        console.error('Update profile error:', error)
        return errorResponse('Failed to update profile', 500)
    }
}
