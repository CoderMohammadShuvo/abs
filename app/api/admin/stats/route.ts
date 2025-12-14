import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-middleware'
import { successResponse, errorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

export async function GET(request: NextRequest) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        // Get user counts by role
        const usersByRole = await prisma.user.groupBy({
            by: ['role'],
            where: {
                deletedAt: null
            },
            _count: {
                id: true
            }
        })

        const roleStats = usersByRole.reduce((acc, item) => {
            acc[item.role] = item._count.id
            return acc
        }, {} as Record<string, number>)

        // Get total users
        const totalUsers = await prisma.user.count({
            where: { deletedAt: null }
        })

        // Get active users
        const activeUsers = await prisma.user.count({
            where: {
                deletedAt: null,
                isActive: true
            }
        })

        // Get recent registrations (last 30 days)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const recentRegistrations = await prisma.user.count({
            where: {
                deletedAt: null,
                createdAt: {
                    gte: thirtyDaysAgo
                }
            }
        })

        // Get total enrollments
        const totalEnrollments = await prisma.enrollment.count({
            where: { deletedAt: null }
        })

        // Get paid enrollments
        const paidEnrollments = await prisma.enrollment.count({
            where: {
                deletedAt: null,
                paid: true
            }
        })

        // Get total courses
        const totalCourses = await prisma.course.count({
            where: { deletedAt: null }
        })

        // Get total orders
        const totalOrders = await prisma.order.count({
            where: { deletedAt: null }
        })

        // Get revenue from orders
        const orderRevenue = await prisma.order.aggregate({
            where: {
                deletedAt: null,
                status: { in: ['PAID', 'DELIVERED'] }
            },
            _sum: {
                total: true
            }
        })

        // Get revenue from enrollments
        const enrollmentRevenue = await prisma.payment.aggregate({
            where: {
                status: 'PAID',
                enrollments: {
                    some: {}
                }
            },
            _sum: {
                amount: true
            }
        })

        // Get total books
        const totalBooks = await prisma.book.count({
            where: { deletedAt: null }
        })

        // Get total blog posts
        const totalBlogs = await prisma.blogPost.count({
            where: { deletedAt: null }
        })

        // Recent activities (last 10 audit logs)
        const recentActivities = await prisma.auditLog.findMany({
            take: 10,
            orderBy: { occurredAt: 'desc' },
            include: {
                user: {
                    include: {
                        profile: true
                    }
                }
            }
        })

        return successResponse({
            users: {
                total: totalUsers,
                active: activeUsers,
                byRole: roleStats,
                recentRegistrations
            },
            enrollments: {
                total: totalEnrollments,
                paid: paidEnrollments
            },
            courses: {
                total: totalCourses
            },
            orders: {
                total: totalOrders
            },
            revenue: {
                orders: orderRevenue._sum.total || 0,
                enrollments: enrollmentRevenue._sum.amount || 0,
                total: (orderRevenue._sum.total || 0) + (enrollmentRevenue._sum.amount || 0)
            },
            books: {
                total: totalBooks
            },
            blogs: {
                total: totalBlogs
            },
            recentActivities: recentActivities.map(activity => ({
                id: activity.id,
                action: activity.action,
                entity: activity.entity,
                entityId: activity.entityId,
                occurredAt: activity.occurredAt,
                user: activity.user ? {
                    fullName: activity.user.profile?.fullName || 'Unknown',
                    email: activity.user.email
                } : null
            }))
        })
    } catch (error) {
        console.error('Get stats error:', error)
        return errorResponse('Failed to fetch statistics', 500)
    }
}
