import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import Contact from '@/lib/models/Contact'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  try {
    const { id } = await params
    await connectDB()
    const contact = await Contact.findById(id)
    if (!contact) {
      return NextResponse.json({ title: 'Contact not found' }, { status: 404 })
    }
    return NextResponse.json({ data: contact })
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
    const deleted = await Contact.findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ title: 'Contact not found' }, { status: 404 })
    }
    return new NextResponse(null, { status: 204 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ title: 'Internal Server Error' }, { status: 500 })
  }
}
