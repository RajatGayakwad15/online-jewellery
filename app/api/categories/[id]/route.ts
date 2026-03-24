import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import Category from '@/lib/models/Category'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await connectDB()
    const category = await Category.findOne({ slug: id })
    if (!category) {
      return NextResponse.json({ title: 'Category not found' }, { status: 404 })
    }
    return NextResponse.json({ data: category })
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
    const { name, slug } = body

    await connectDB()
    const updated = await Category.findByIdAndUpdate(
      id,
      { ...(name ? { name } : {}), ...(slug ? { slug } : {}) },
      { new: true }
    )

    if (!updated) {
      return NextResponse.json({ title: 'Category not found' }, { status: 404 })
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
    const deleted = await Category.findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ title: 'Category not found' }, { status: 404 })
    }
    return new NextResponse(null, { status: 204 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ title: 'Internal Server Error' }, { status: 500 })
  }
}
