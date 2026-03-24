import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import Order from '@/lib/models/Order'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    await connectDB()
    const order = await Order.findById(id)
    if (!order) {
      return NextResponse.json({ title: 'Order not found' }, { status: 404 })
    }
    return NextResponse.json({ data: order })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ title: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    const body = await req.json().catch(() => ({}))

    await connectDB()
    const updated = await Order.findByIdAndUpdate(id, body, { new: true })
    if (!updated) {
      return NextResponse.json({ title: 'Order not found' }, { status: 404 })
    }
    return NextResponse.json({ data: updated })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ title: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    await connectDB()
    const deleted = await Order.findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ title: 'Order not found' }, { status: 404 })
    }
    return new NextResponse(null, { status: 204 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ title: 'Internal Server Error' }, { status: 500 })
  }
}
