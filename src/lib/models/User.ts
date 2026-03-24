import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true, index: true },
    phone: { type: String, default: '' },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
)

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc: mongoose.Document, ret: Record<string, unknown>) {
    ret.id = (ret._id as mongoose.Types.ObjectId).toString()
    delete ret._id
    delete ret.passwordHash
  },
})

export default mongoose.models.User ?? mongoose.model('User', UserSchema)
