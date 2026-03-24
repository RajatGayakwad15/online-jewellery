import mongoose from 'mongoose'

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: '' },
    subject: { type: String, default: '' },
    message: { type: String, required: true },
  },
  { timestamps: true }
)

ContactSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc: mongoose.Document, ret: Record<string, unknown>) {
    ret.id = (ret._id as mongoose.Types.ObjectId).toString()
    delete ret._id
  },
})

export default mongoose.models.Contact ?? mongoose.model('Contact', ContactSchema)
