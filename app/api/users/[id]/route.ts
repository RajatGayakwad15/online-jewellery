import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    await connectDB()
    const user = await User.findById(id)
    if (!user) {
      return NextResponse.json({ title: 'User not found' }, { status: 404 })
    }
    return NextResponse.json({ data: user })
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
    const deleted = await User.findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ title: 'User not found' }, { status: 404 })
    }
    return new NextResponse(null, { status: 204 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ title: 'Internal Server Error' }, { status: 500 })
  }
}
