import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { name, email, phone, password } = body

    if (!name || !email || !password) {
      return NextResponse.json({ title: 'Missing required fields' }, { status: 400 })
    }

    await connectDB()

    const normalizedEmail = String(email).toLowerCase()
    const existing = await User.findOne({ email: normalizedEmail })
    if (existing) {
      return NextResponse.json({ title: 'Email already exists' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(String(password), 10)
    const created = await User.create({
      name: String(name),
      email: normalizedEmail,
      phone: String(phone || ''),
      passwordHash,
      role: 'user',
    })

    return NextResponse.json({ data: created }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ title: 'Internal Server Error' }, { status: 500 })
  }
}
