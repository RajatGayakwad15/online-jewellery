const cloudinary = require('cloudinary').v2

function initCloudinaryFromEnv() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  const missing = []
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

async function uploadToCloudinary(buffer, filename, folder) {
  initCloudinaryFromEnv()

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folder || 'products' },
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      }
    )

    stream.end(buffer, 'binary')
  })
}

module.exports = { uploadToCloudinary }

