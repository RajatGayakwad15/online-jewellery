import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import Product from '@/lib/models/Product'
import { uploadToCloudinary } from '@/lib/cloudinary'

function parseJsonField(value: unknown) {
  if (value === undefined) return undefined
  if (typeof value !== 'string') return value
  if (!value.trim()) return undefined
  try {
    return JSON.parse(value)
  } catch {
    return undefined
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const categorySlug = searchParams.get('categorySlug')
    const filter: Record<string, unknown> = {}
    if (categorySlug) filter.categorySlug = categorySlug

    await connectDB()
    const products = await Product.find(filter).sort({ createdAt: -1 })
    return NextResponse.json({ data: products })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ title: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  try {
    const formData = await req.formData()

    const categorySlug = formData.get('categorySlug') as string
    const name = formData.get('name') as string
    const brand = formData.get('brand') as string
    const actualPrice = formData.get('actualPrice') as string
    const discountPrice = formData.get('discountPrice') as string | null
    const information = formData.get('information') as string
    const commonFields = formData.get('commonFields') as string
    const productDetails = formData.get('productDetails') as string
    const dimensions = formData.get('dimensions') as string
    const warranty = formData.get('warranty') as string

    if (!categorySlug || !name || !brand || !actualPrice) {
      return NextResponse.json({ title: 'Missing required fields' }, { status: 400 })
    }

    const actualPriceNumber = Number(actualPrice)
    if (Number.isNaN(actualPriceNumber)) {
      return NextResponse.json({ title: 'actualPrice must be a number' }, { status: 400 })
    }

    const discountPriceNumber =
      !discountPrice || discountPrice === '' ? null : Number(discountPrice)

    const files = formData.getAll('images') as File[]
    const images = await Promise.all(
      files.map(async (f) => {
        const buffer = Buffer.from(await f.arrayBuffer())
        const result = await uploadToCloudinary(buffer, f.name, 'products')
        return result.secure_url
      })
    )

    await connectDB()
    const created = await Product.create({
      categorySlug: String(categorySlug),
      name: String(name),
      brand: String(brand),
      actual_price: actualPriceNumber,
      discount_price:
        discountPriceNumber === null || Number.isNaN(discountPriceNumber)
          ? null
          : discountPriceNumber,
      information: String(information || ''),
      images,
      common_fields: parseJsonField(commonFields) || [],
      product_details: parseJsonField(productDetails) || [],
      dimensions_details: parseJsonField(dimensions) || [],
      warranty: parseJsonField(warranty) || [],
    })

    return NextResponse.json({ data: created }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ title: 'Internal Server Error' }, { status: 500 })
  }
}
