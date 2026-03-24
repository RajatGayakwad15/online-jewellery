import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('Missing JWT_SECRET')
  return secret
}

const ADMIN_EMAIL = 'yogita15@gmail.com'
const ADMIN_PASSWORD = 'Yogita@1503'

function signToken(user: { name: string; email: string; role: string }) {
  return jwt.sign(
    { sub: user.email, email: user.email, role: user.role, name: user.name },
    getJwtSecret(),
    { expiresIn: '7d' }
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ title: 'Missing email/password' }, { status: 400 })
    }

    const normalizedEmail = String(email).toLowerCase()

    if (normalizedEmail === ADMIN_EMAIL && String(password) === ADMIN_PASSWORD) {
      return NextResponse.json({
        token: signToken({ name: 'Admin', email: ADMIN_EMAIL, role: 'admin' }),
      })
    }

    await connectDB()
    const user = await User.findOne({ email: normalizedEmail })
    if (!user) {
      return NextResponse.json({ title: 'Unauthorized' }, { status: 401 })
    }

    const ok = await bcrypt.compare(String(password), user.passwordHash)
    if (!ok) {
      return NextResponse.json({ title: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json({ token: signToken(user) })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ title: 'Internal Server Error' }, { status: 500 })
  }
}
