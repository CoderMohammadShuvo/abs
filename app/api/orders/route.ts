import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAuth, requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

// GET - List orders (Student sees own, Admin/Manager sees all)
export async function GET(request: NextRequest) {
    try {
        const authResult = requireAuth(request)
        if (authResult instanceof Response) return authResult

        const { userId, role } = authResult.user
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '20')
        const status = searchParams.get('status')
        const skip = (page - 1) * limit

        const where: any = {
            OR: [
                { deletedAt: null },
                { deletedAt: { isSet: false } }
            ]
        }

        // Role based filtering
        const isManager = [UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.SHOP_MANAGER].includes(role as UserRole)

        if (!isManager) {
            where.userId = userId
        }

        if (status) {
            where.status = status
        }

        const [orders, total] = await Promise.all([
            prisma.order.findMany({
                where,
                include: {
                    items: {
                        include: { book: { select: { title: true, coverUrl: true } } }
                    },
                    user: { select: { email: true, profile: { select: { fullName: true } } } },
                    address: true
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.order.count({ where })
        ])

        return successResponse({
            orders,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
        })

    } catch (error) {
        console.error('List orders error:', error)
        return errorResponse('Failed to fetch orders', 500)
    }
}

// POST - Place order
// Accepts: { items: [{ bookId, quantity }], mobile?, address? }
const orderItemSchema = z.object({
    bookId: z.string(),
    quantity: z.number().int().min(1)
})

const createOrderSchema = z.object({
    items: z.array(orderItemSchema).min(1),
    address: z.object({
        street: z.string(),
        city: z.string(),
        postalCode: z.string(),
        country: z.string().default('Bangladesh')
    }).optional(),
    addressId: z.string().optional(), // Use existing address
    paymentMethod: z.enum(['COD', 'BKASH', 'SSL_COMMERZ']).default('COD')
})

export async function POST(request: NextRequest) {
    try {
        const authResult = requireAuth(request)
        if (authResult instanceof Response) return authResult

        const body = await request.json()
        const validation = createOrderSchema.safeParse(body)
        if (!validation.success) {
            return validationErrorResponse(
                validation.error.errors.reduce((acc, err) => {
                    acc[err.path[0]] = err.message
                    return acc
                }, {} as Record<string, string>)
            )
        }

        const { items, address, addressId, paymentMethod } = validation.data
        const userId = authResult.user.userId

        // 1. Resolve Address
        let finalAddressId = addressId
        if (address) {
            const newAddress = await prisma.address.create({
                data: { ...address, userId }
            })
            finalAddressId = newAddress.id
        }

        // 2. Fetch books and calculate total
        let total = 0
        const orderItemsData: { bookId: string; quantity: number; unitPrice: number }[] = []

        for (const item of items) {
            const book = await prisma.book.findUnique({ where: { id: item.bookId } })
            if (!book) return errorResponse(`Book not found: ${item.bookId}`, 400)
            if (book.stock < item.quantity) return errorResponse(`Insufficient stock for: ${book.title}`, 400)

            total += book.price * item.quantity
            orderItemsData.push({
                bookId: item.bookId,
                quantity: item.quantity,
                unitPrice: book.price
            })
        }

        // 3. Create Order
        // Transaction to ensure stock updates
        const order = await prisma.$transaction(async (tx) => {
            // Update stocks
            for (const item of orderItemsData) {
                await tx.book.update({
                    where: { id: item.bookId },
                    data: { stock: { decrement: item.quantity } }
                })
            }

            const newOrder = await tx.order.create({
                data: {
                    userId,
                    addressId: finalAddressId,
                    status: 'PENDING',
                    total,
                    paymentMethod: paymentMethod as any,
                    items: {
                        createMany: {
                            data: orderItemsData.map(i => ({
                                bookId: i.bookId,
                                quantity: i.quantity,
                                unitPrice: i.unitPrice
                            }))
                        }
                    }
                },
                include: { items: true }
            })

            return newOrder
        })

        return successResponse(order, 'Order placed successfully', 201)

    } catch (error) {
        console.error('Place order error:', error)
        return errorResponse('Failed to place order', 500)
    }
}
