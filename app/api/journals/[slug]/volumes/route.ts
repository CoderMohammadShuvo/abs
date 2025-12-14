import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse } from '@/lib/api-response'

interface RouteParams {
    params: Promise<{
        slug: string
    }>
}

// GET - Get volumes/issues for a journal
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
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

        // Get distinct volumes and issues from articles
        const articles = await prisma.article.findMany({
            where: {
                journalId: journal.id,
                deletedAt: null
            },
            select: {
                volume: true,
                issue: true,
                publishedDate: true
            },
            orderBy: [
                { volume: 'desc' },
                { issue: 'desc' }
            ]
        })

        // Group by volume and issue
        const volumesMap = new Map<string, any>()

        articles.forEach((article: any) => {
            if (!article.volume) return

            const volumeKey = article.volume
            if (!volumesMap.has(volumeKey)) {
                volumesMap.set(volumeKey, {
                    volume: article.volume,
                    issues: new Set<string>()
                })
            }

            if (article.issue) {
                volumesMap.get(volumeKey).issues.add(article.issue)
            }
        })

        // Convert to array format
        const volumes = Array.from(volumesMap.values()).map(v => ({
            volume: v.volume,
            issues: Array.from(v.issues).sort()
        }))

        return successResponse({
            journalId: journal.id,
            journalTitle: journal.title,
            volumes
        })
    } catch (error) {
        console.error('Get volumes error:', error)
        return errorResponse('Failed to fetch volumes', 500)
    }
}
