import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireRole } from '@/lib/auth-middleware'
import { successResponse, errorResponse } from '@/lib/api-response'
import { UserRole } from '@prisma/client'

export async function GET(request: NextRequest) {
    try {
        const authResult = requireRole(request, [UserRole.ACCOUNTANT, UserRole.ADMIN, UserRole.SUPER_ADMIN])
        if (authResult instanceof Response) return authResult

        const { searchParams } = new URL(request.url)
        const startDate = searchParams.get('startDate')
        const endDate = searchParams.get('endDate')

        // Default to current month if no dates provided
        const now = new Date()
        const start = startDate ? new Date(startDate) : new Date(now.getFullYear(), now.getMonth(), 1)
        const end = endDate ? new Date(endDate) : new Date(now.getFullYear(), now.getMonth() + 1, 0)

        const where: any = {
            recordedAt: {
                gte: start,
                lte: end
            }
        }

        const entries = await prisma.accountEntry.findMany({
            where,
            select: { type: true, amount: true }
        })

        let totalIncome = 0
        let totalExpense = 0

        entries.forEach(e => {
            if (e.type === 'INCOME') totalIncome += e.amount
            if (e.type === 'EXPENSE') totalExpense += e.amount
        })

        const balance = totalIncome - totalExpense

        return successResponse({
            period: { start, end },
            totalIncome,
            totalExpense,
            balance,
            transactionCount: entries.length
        })

    } catch (error) {
        console.error('Account summary error:', error)
        return errorResponse('Failed to fetch summary', 500)
    }
}
