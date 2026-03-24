import mongoose from 'mongoose'

const OrderItemSchema = new mongoose.Schema(
  {
    product_id: { type: String, required: true, index: true },
    name: { type: String, required: true },
    brand: { type: String, default: '' },
    quantity: { type: Number, required: true, min: 1 },
    actual_price: { type: Number, required: true, min: 0 },
    discount_price: { type: Number, default: null, min: 0 },
    images: { type: [String], default: [] },
  },
  { _id: false }
)

const OrderSchema = new mongoose.Schema(
  {
    user: {
      username: { type: String, default: '' },
    },
    shipping: {
      name: { type: String, required: true, trim: true },
      pincode: { type: String, required: true, trim: true },
      address: { type: String, required: true },
      addressType: { type: String, required: true, enum: ['home', 'work'] },
    },
    paymentMethod: { type: String, required: true, enum: ['cod', 'online'] },
    items: { type: [OrderItemSchema], required: true, default: [] },
  },
  { timestamps: true }
)

OrderSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc: mongoose.Document, ret: Record<string, unknown>) {
    ret.id = (ret._id as mongoose.Types.ObjectId).toString()
    delete ret._id
  },
})

export default mongoose.models.Order ?? mongoose.model('Order', OrderSchema)
