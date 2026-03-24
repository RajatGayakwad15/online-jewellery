import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('Missing JWT_SECRET')
  return secret
}

export interface JwtPayload {
  sub: string
  email: string
  role: string
  name: string
  iat?: number
  exp?: number
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, getJwtSecret()) as JwtPayload
}

export function extractToken(req: NextRequest): string | null {
  const header = req.headers.get('authorization') ?? ''
  const [type, token] = header.split(' ')
  if (type !== 'Bearer' || !token) return null
  return token
}

export function requireAuth(
  req: NextRequest
): { payload: JwtPayload } | NextResponse {
  const token = extractToken(req)
  if (!token) {
    return NextResponse.json({ title: 'Unauthorized' }, { status: 401 })
  }
  try {
    const payload = verifyToken(token)
    return { payload }
  } catch {
    return NextResponse.json({ title: 'Unauthorized' }, { status: 401 })
  }
}

export function requireAdmin(
  req: NextRequest
): { payload: JwtPayload } | NextResponse {
  const token = extractToken(req)
  if (!token) {
    return NextResponse.json({ title: 'Unauthorized' }, { status: 401 })
  }
  try {
    const payload = verifyToken(token)
    if (String(payload?.role ?? '').toLowerCase() !== 'admin') {
      return NextResponse.json(
        { title: 'Forbidden', message: 'Admin access required' },
        { status: 403 }
      )
    }
    return { payload }
  } catch {
    return NextResponse.json({ title: 'Unauthorized' }, { status: 401 })
  }
}
