import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-middleware'
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api-response'

interface RouteParams {
    params: Promise<{
        slug: string
    }>
}

// POST - Manual API sync
export async function POST(request: NextRequest, { params }: RouteParams) {
    try {
        const authResult = requireAdmin(request)
        if (authResult instanceof Response) {
            return authResult
        }

        const { slug } = await params

        // Find journal by slug or ID
        const journal = await prisma.journal.findFirst({
            where: {
                OR: [
                    { slug },
                    { id: slug }
                ]
            }
        })

        if (!journal || journal.deletedAt) {
            return notFoundResponse('Journal not found')
        }

        if (!journal.apiUrl) {
            return errorResponse('Journal does not have an API URL configured', 400)
        }

        // TODO: Implement actual API sync logic here
        // This is a placeholder that would typically:
        // 1. Fetch data from the journal's API
        // 2. Parse the response
        // 3. Update or create articles in the database
        // 4. Return sync statistics

        // For now, just update the lastSyncedAt timestamp
        await prisma.journal.update({
            where: { id: journal.id },
            data: {
                lastSyncedAt: new Date()
            }
        })

        return successResponse({
            message: 'API sync initiated successfully',
            journalId: journal.id,
            syncedAt: new Date()
        }, 'Sync completed successfully')
    } catch (error) {
        console.error('Journal sync error:', error)
        return errorResponse('Failed to sync journal', 500)
    }
}
