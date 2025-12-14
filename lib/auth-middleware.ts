import { NextRequest } from 'next/server'
import { verifyToken, JWTPayload } from './jwt'
import { unauthorizedResponse, forbiddenResponse } from './api-response'
import { UserRole } from '@prisma/client'

/**
 * Extract token from Authorization header
 */
export function extractToken(request: NextRequest): string | null {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null
    }
    return authHeader.substring(7)
}

/**
 * Get current user from request
 */
export function getCurrentUser(request: NextRequest): JWTPayload | null {
    const token = extractToken(request)
    if (!token) {
        return null
    }
    return verifyToken(token)
}

/**
 * Require authentication middleware
 */
export function requireAuth(request: NextRequest): { user: JWTPayload } | Response {
    const user = getCurrentUser(request)
    if (!user) {
        return unauthorizedResponse('Authentication required')
    }
    return { user }
}

/**
 * Require specific role(s) middleware
 */
export function requireRole(
    request: NextRequest,
    allowedRoles: UserRole[]
): { user: JWTPayload } | Response {
    const authResult = requireAuth(request)

    if (authResult instanceof Response) {
        return authResult
    }

    const { user } = authResult

    if (!allowedRoles.includes(user.role as UserRole)) {
        return forbiddenResponse('Insufficient permissions')
    }

    return { user }
}

/**
 * Require admin role (ADMIN or SUPER_ADMIN)
 */
export function requireAdmin(request: NextRequest): { user: JWTPayload } | Response {
    return requireRole(request, [UserRole.ADMIN, UserRole.SUPER_ADMIN])
}

/**
 * Require super admin role
 */
export function requireSuperAdmin(request: NextRequest): { user: JWTPayload } | Response {
    return requireRole(request, [UserRole.SUPER_ADMIN])
}
