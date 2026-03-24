import mongoose from 'mongoose'

const FieldItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    info: { type: String, required: true, trim: true },
  },
  { _id: false }
)

const ProductSchema = new mongoose.Schema(
  {
    categorySlug: { type: String, required: true, index: true, trim: true },
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    actual_price: { type: Number, required: true, min: 0 },
    discount_price: { type: Number, default: null, min: 0 },
    information: { type: String, default: '' },
    images: { type: [String], default: [] },
    common_fields: { type: [FieldItemSchema], default: [] },
    product_details: { type: [FieldItemSchema], default: [] },
    dimensions_details: { type: [FieldItemSchema], default: [] },
    warranty: { type: [FieldItemSchema], default: [] },
  },
  { timestamps: true }
)

ProductSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc: mongoose.Document, ret: Record<string, unknown>) {
    ret.id = (ret._id as mongoose.Types.ObjectId).toString()
    delete ret._id
  },
})

export default mongoose.models.Product ?? mongoose.model('Product', ProductSchema)
