import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'

export function GET(req: NextRequest) {
  const result = requireAuth(req)
  if (result instanceof NextResponse) return result

  return NextResponse.json({ data: result.payload })
}
