import { NextRequest } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { successResponse, errorResponse, validationErrorResponse } from '@/lib/api-response'
import { requireAuth } from '@/lib/auth-middleware'

// GET - List consultancy services (static list for now as per probable current req, or future proofing)
// The user asked for "List consultancy services". There isn't a "ConsultancyService" model in schema, so this might just be a static landing page or similar.
// However, the prompt implies "List consultancy services" API.
// Since there's no model, I'll return a static list or an empty list if dynamic.
// I'll stick to dynamic if I create a model, but I can't modify schema.
// So I will implement this as a mock or configuration-based response for now, 
// OR simply return nothing relevant if it's meant to be just requests.
// Wait, the prompt says "GET /consultancy List consultancy services | ALL".
// Since there's no model in the schema scan, I'll return a static list of offered services.

export async function GET(request: NextRequest) {
    try {
        const services = [
            { id: '1', title: 'IT Consultancy', description: 'Expert advice on IT infrastructure.' },
            { id: '2', title: 'Business Strategy', description: 'Strategic planning for your business growth.' },
            { id: '3', title: 'Educational Counseling', description: 'Guidance for higher studies and career.' },
            { id: '4', title: 'Software Development', description: 'Custom software solutions.' }
        ]
        return successResponse(services)
    } catch (error) {
        return errorResponse('Failed to fetch services', 500)
    }
}
