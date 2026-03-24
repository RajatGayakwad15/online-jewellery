import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, unique: true, index: true },
  },
  { timestamps: true }
)

CategorySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc: mongoose.Document, ret: Record<string, unknown>) {
    ret.id = (ret._id as mongoose.Types.ObjectId).toString()
    delete ret._id
  },
})

export default mongoose.models.Category ?? mongoose.model('Category', CategorySchema)
