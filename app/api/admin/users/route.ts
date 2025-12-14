import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/password'
import { requireAdmin } from '@/lib/auth-middleware'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

// GET - List all users with pagination and filtering
export async function GET(request: NextRequest) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const role = searchParams.get('role') as UserRole | null
        const search = searchParams.get('search') || ''
        const isActive = searchParams.get('isActive')

        const skip = (page - 1) * limit

        // Build where clause
        const where: any = {
            deletedAt: null
        }

        if (role) {
            where.role = role
        }

        if (isActive !== null && isActive !== '') {
            where.isActive = isActive === 'true'
        }

        if (search) {
            where.OR = [
                { email: { contains: search, mode: 'insensitive' } },
                { userId: { contains: search, mode: 'insensitive' } },
                { profile: { fullName: { contains: search, mode: 'insensitive' } } }
            ]
        }

        // Fetch users and total count
        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                include: {
                    profile: true
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.user.count({ where })
        ])

        // Remove password hashes
        const usersWithoutPasswords = users.map(({ passwordHash, ...user }) => user)

        return successResponse({
            users: usersWithoutPasswords,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error('List users error:', error)
        return errorResponse('Failed to fetch users', 500)
    }
}

// POST - Create new user
const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    fullName: z.string().min(2),
    role: z.nativeEnum(UserRole),
    isActive: z.boolean().optional().default(true)
})

export async function POST(request: NextRequest) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const body = await request.json()

        // Validate input
        const validation = createUserSchema.safeParse(body)
        if (!validation.success) {
            const errors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message
                return acc
            }, {} as Record<string, string>)
            return validationErrorResponse(errors)
        }

        const { email, password, fullName, role, isActive } = validation.data

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return errorResponse('User with this email already exists', 409)
        }

        // Hash password
        const passwordHash = await hashPassword(password)

        // Generate unique userId
        const userId = `USR-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`

        // Create user
        const user = await prisma.user.create({
            data: {
                userId,
                email,
                passwordHash,
                role,
                isActive,
                profile: {
                    create: {
                        fullName,
                        status: isActive ? 'active' : 'inactive'
                    }
                }
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
                action: 'CREATE',
                changes: { email, role, fullName }
            }
        })

        const { passwordHash: _, ...userWithoutPassword } = user

        return successResponse(userWithoutPassword, 'User created successfully', 201)
    } catch (error) {
        console.error('Create user error:', error)
        return errorResponse('Failed to create user', 500)
    }
}
