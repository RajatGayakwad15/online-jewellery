import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, requireAdmin } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import Order from '@/lib/models/Order'

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  try {
    await connectDB()
    const orders = await Order.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ data: orders })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ title: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof NextResponse) return auth

  try {
    const body = await req.json().catch(() => ({}))
    const { shipping, paymentMethod, items } = body

    if (!shipping || !paymentMethod || !Array.isArray(items)) {
      return NextResponse.json({ title: 'Missing required fields' }, { status: 400 })
    }

    const username =
      auth.payload?.email || auth.payload?.sub || auth.payload?.name || ''

    await connectDB()
    const created = await Order.create({
      user: { username },
      shipping,
      paymentMethod,
      items,
    })

    return NextResponse.json({ data: created }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ title: 'Internal Server Error' }, { status: 500 })
  }
}
