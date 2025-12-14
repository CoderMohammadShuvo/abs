import { NextResponse } from 'next/server'

export interface ApiSuccessResponse<T = any> {
    success: true
    data: T
    message?: string
}

export interface ApiErrorResponse {
    success: false
    error: string
    details?: any
}

/**
 * Create a success response
 */
export function successResponse<T>(data: T, message?: string, status: number = 200): NextResponse {
    const response: ApiSuccessResponse<T> = {
        success: true,
        data,
        ...(message && { message })
    }
    return NextResponse.json(response, { status })
}

/**
 * Create an error response
 */
export function errorResponse(error: string, status: number = 400, details?: any): NextResponse {
    const response: ApiErrorResponse = {
        success: false,
        error,
        ...(details && { details })
    }
    return NextResponse.json(response, { status })
}

/**
 * Create a validation error response
 */
export function validationErrorResponse(errors: Record<string, string>): NextResponse {
    return errorResponse('Validation failed', 422, errors)
}

/**
 * Create an unauthorized response
 */
export function unauthorizedResponse(message: string = 'Unauthorized'): NextResponse {
    return errorResponse(message, 401)
}

/**
 * Create a forbidden response
 */
export function forbiddenResponse(message: string = 'Forbidden'): NextResponse {
    return errorResponse(message, 403)
}

/**
 * Create a not found response
 */
export function notFoundResponse(message: string = 'Not found'): NextResponse {
    return errorResponse(message, 404)
}
