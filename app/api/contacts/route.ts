import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import Contact from '@/lib/models/Contact'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { name, email, phone, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ title: 'Missing required fields' }, { status: 400 })
    }

    await connectDB()
    const created = await Contact.create({
      name: String(name),
      email: String(email),
      phone: String(phone || ''),
      subject: String(subject || ''),
      message: String(message),
    })

    return NextResponse.json({ data: created }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ title: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  try {
    await connectDB()
    const contacts = await Contact.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ data: contacts })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ title: 'Internal Server Error' }, { status: 500 })
  }
}
