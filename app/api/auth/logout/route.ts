import { NextRequest } from 'next/server'
import { successResponse } from '@/lib/api-response'

export async function POST(request: NextRequest) {
    // In a stateless JWT implementation, "logout" is mostly a client-side action (deleting the token).
    // However, we can implement a blacklist or just return success to clear cookies if we were using them.
    // For now, we'll just return success as the client handles token removal.

    return successResponse(null, 'Logged out successfully')
}
