import { v2 as cloudinary } from 'cloudinary'

function initCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  const missing: string[] = []
  if (!cloudName) missing.push('CLOUDINARY_CLOUD_NAME')
  if (!apiKey) missing.push('CLOUDINARY_API_KEY')
  if (!apiSecret) missing.push('CLOUDINARY_API_SECRET')

  if (missing.length > 0) {
    throw new Error(`Missing Cloudinary env vars: ${missing.join(', ')}`)
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  })
}

export async function uploadToCloudinary(
  buffer: Buffer,
  filename: string,
  folder: string
): Promise<{ secure_url: string }> {
  initCloudinary()

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folder || 'products', public_id: filename },
      (error, result) => {
        if (error || !result) return reject(error)
        resolve(result as { secure_url: string })
      }
    )
    stream.end(buffer)
  })
}
