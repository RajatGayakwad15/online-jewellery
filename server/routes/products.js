const express = require('express')
const multer = require('multer')
const Product = require('../models/Product')
const { uploadToCloudinary } = require('../utils/cloudinary')

const router = express.Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB per file
})

function parseJsonField(value) {
  if (value === undefined) return undefined
  if (typeof value !== 'string') return value
  if (!value.trim()) return undefined
  try {
    return JSON.parse(value)
  } catch {
    return undefined
  }
}

router.get('/', async (req, res, next) => {
  try {
    const { categorySlug } = req.query
    const filter = {}
    if (categorySlug) filter.categorySlug = categorySlug

    const products = await Product.find(filter).sort({ createdAt: -1 })
    res.json({ data: products })
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ title: 'Product not found' })
    res.json({ data: product })
  } catch (err) {
    next(err)
  }
})

router.post(
  '/',
  upload.array('images', 12),
  async (req, res, next) => {
    try {
      const files = req.files || []

      const {
        categorySlug,
        name,
        brand,
        actualPrice,
        discountPrice,
        information,
        commonFields,
        productDetails,
        dimensions,
        warranty,
      } = req.body || {}

      if (!categorySlug || !name || !brand || !actualPrice) {
        return res.status(400).json({ title: 'Missing required fields' })
      }

      const parsedCommonFields = parseJsonField(commonFields) || []
      const parsedProductDetails = parseJsonField(productDetails) || []
      const parsedDimensions = parseJsonField(dimensions) || []
      const parsedWarranty = parseJsonField(warranty) || []

      const actualPriceNumber = Number(actualPrice)
      if (Number.isNaN(actualPriceNumber)) {
        return res.status(400).json({ title: 'actualPrice must be a number' })
      }

      const discountPriceNumber =
        discountPrice === '' || discountPrice === undefined || discountPrice === null
          ? null
          : Number(discountPrice)

      const images = await Promise.all(
        files.map(async (f) => {
          const result = await uploadToCloudinary(
            f.buffer,
            f.originalname,
            'products'
          )
          return result.secure_url
        })
      )

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
        common_fields: parsedCommonFields,
        product_details: parsedProductDetails,
        dimensions_details: parsedDimensions,
        warranty: parsedWarranty,
      })

      res.status(201).json({ data: created })
    } catch (err) {
      next(err)
    }
  }
)

router.put(
  '/:id',
  upload.array('images', 12),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const existing = await Product.findById(id)
      if (!existing) return res.status(404).json({ title: 'Product not found' })

      const {
        categorySlug,
        name,
        brand,
        actualPrice,
        discountPrice,
        information,
        commonFields,
        productDetails,
        dimensions,
        warranty,
      } = req.body || {}

      const parsedCommonFields = parseJsonField(commonFields)
      const parsedProductDetails = parseJsonField(productDetails)
      const parsedDimensions = parseJsonField(dimensions)
      const parsedWarranty = parseJsonField(warranty)

      const actualPriceNumber =
        actualPrice === '' || actualPrice === undefined ? undefined : Number(actualPrice)

      const discountPriceNumber =
        discountPrice === '' || discountPrice === undefined || discountPrice === null
          ? null
          : Number(discountPrice)

      const files = req.files || []
      let uploadedImages = []
      if (files.length > 0) {
        uploadedImages = await Promise.all(
          files.map(async (f) => {
            const result = await uploadToCloudinary(
              f.buffer,
              f.originalname,
              'products'
            )
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
          ...(information !== undefined ? { information: String(information) } : {}),
          ...(parsedCommonFields ? { common_fields: parsedCommonFields } : {}),
          ...(parsedProductDetails ? { product_details: parsedProductDetails } : {}),
          ...(parsedDimensions ? { dimensions_details: parsedDimensions } : {}),
          ...(parsedWarranty ? { warranty: parsedWarranty } : {}),
          ...(uploadedImages.length > 0 ? { images: [...existing.images, ...uploadedImages] } : {}),
        },
        { new: true }
      )

      res.json({ data: updated })
    } catch (err) {
      next(err)
    }
  }
)

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ title: 'Product not found' })
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

module.exports = router

