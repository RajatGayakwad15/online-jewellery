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

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await connectDB()
    const product = await Product.findById(id)
    if (!product) {
      return NextResponse.json({ title: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json({ data: product })
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
    const formData = await req.formData()

    const categorySlug = formData.get('categorySlug') as string | null
    const name = formData.get('name') as string | null
    const brand = formData.get('brand') as string | null
    const actualPrice = formData.get('actualPrice') as string | null
    const discountPrice = formData.get('discountPrice') as string | null
    const information = formData.get('information') as string | null
    const commonFields = formData.get('commonFields') as string | null
    const productDetails = formData.get('productDetails') as string | null
    const dimensions = formData.get('dimensions') as string | null
    const warranty = formData.get('warranty') as string | null

    const parsedCommonFields = parseJsonField(commonFields)
    const parsedProductDetails = parseJsonField(productDetails)
    const parsedDimensions = parseJsonField(dimensions)
    const parsedWarranty = parseJsonField(warranty)

    const actualPriceNumber =
      !actualPrice || actualPrice === '' ? undefined : Number(actualPrice)
    const discountPriceNumber =
      !discountPrice || discountPrice === '' ? null : Number(discountPrice)

    await connectDB()
    const existing = await Product.findById(id)
    if (!existing) {
      return NextResponse.json({ title: 'Product not found' }, { status: 404 })
    }

    const files = formData.getAll('images') as File[]
    let uploadedImages: string[] = []
    if (files.length > 0) {
      uploadedImages = await Promise.all(
        files.map(async (f) => {
          const buffer = Buffer.from(await f.arrayBuffer())
          const result = await uploadToCloudinary(buffer, f.name, 'products')
          return result.secure_url
        })
      )
    }

    const updated = await Product.findByIdAndUpdate(
      id,
      {
        ...(categorySlug ? { categorySlug: String(categorySlug) } : {}),
        ...(name ? { name: String(name) } : {}),
        ...(brand ? { brand: String(brand) } : {}),
        ...(actualPriceNumber !== undefined && !Number.isNaN(actualPriceNumber)
          ? { actual_price: actualPriceNumber }
          : {}),
        ...(discountPriceNumber !== undefined
          ? {
              discount_price:
                discountPriceNumber === null || Number.isNaN(discountPriceNumber)
                  ? null
                  : discountPriceNumber,
            }
          : {}),
        ...(information !== null ? { information: String(information) } : {}),
        ...(parsedCommonFields ? { common_fields: parsedCommonFields } : {}),
        ...(parsedProductDetails ? { product_details: parsedProductDetails } : {}),
        ...(parsedDimensions ? { dimensions_details: parsedDimensions } : {}),
        ...(parsedWarranty ? { warranty: parsedWarranty } : {}),
        ...(uploadedImages.length > 0
          ? { images: [...existing.images, ...uploadedImages] }
          : {}),
      },
      { new: true }
    )

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
    const deleted = await Product.findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ title: 'Product not found' }, { status: 404 })
    }
    return new NextResponse(null, { status: 204 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ title: 'Internal Server Error' }, { status: 500 })
  }
}
