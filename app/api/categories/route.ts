import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import Category from '@/lib/models/Category'

export async function GET() {
  try {
    await connectDB()
    const categories = await Category.find({}).sort({ name: 1 })
    return NextResponse.json({ data: categories })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ title: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  try {
    const body = await req.json().catch(() => ({}))
    const { name, slug } = body

    if (!name || !slug) {
      return NextResponse.json({ title: 'Missing fields' }, { status: 400 })
    }

    await connectDB()
    const created = await Category.create({ name, slug })
    return NextResponse.json({ data: created }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ title: 'Internal Server Error' }, { status: 500 })
  }
}
