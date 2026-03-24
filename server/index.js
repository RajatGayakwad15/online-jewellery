const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')

const categoriesRouter = require('./routes/categories')
const productsRouter = require('./routes/products')
const ordersRouter = require('./routes/orders')
const contactsRouter = require('./routes/contacts')
const usersRouter = require('./routes/users')
const getDashboardStats = require('./routes/adminStats')
const authRouter = require('./routes/auth')
const { requireAuth, requireAdmin } = require('./middlewares/auth')

// Load env from `server/.env` no matter where the process is started from.
dotenv.config({ path: path.join(__dirname, '.env') })

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || '*',
    credentials: false,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  })
)

app.use(express.json({ limit: '2mb' }))

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', authRouter)

// Safe debug endpoint (no secrets)
app.get('/api/cloudinary-config', (req, res) => {
  const missing = []
  if (!process.env.CLOUDINARY_CLOUD_NAME) missing.push('CLOUDINARY_CLOUD_NAME')
  if (!process.env.CLOUDINARY_API_KEY) missing.push('CLOUDINARY_API_KEY')
  if (!process.env.CLOUDINARY_API_SECRET) missing.push('CLOUDINARY_API_SECRET')

  res.json({
    ok: missing.length === 0,
    missing,
  })
})

// Categories/Products: public GET, admin writes only
app.use(
  '/api/categories',
  (req, res, next) => {
    const mw = req.method === 'GET' ? (r, s, n) => n() : requireAdmin
    return mw(req, res, next)
  },
  categoriesRouter
)
app.use(
  '/api/products',
  (req, res, next) => {
    const mw = req.method === 'GET' ? (r, s, n) => n() : requireAdmin
    return mw(req, res, next)
  },
  productsRouter
)

// Orders: anyone authenticated can place (POST), but admin can view/update/delete
app.use(
  '/api/orders',
  (req, res, next) => {
    const mw = req.method === 'POST' ? requireAuth : requireAdmin
    return mw(req, res, next)
  },
  ordersRouter
)

app.use('/api/contacts', contactsRouter)

// Users: admin only
app.use('/api/users', requireAdmin, usersRouter)

// Dashboard aggregates (admin JWT only) — explicit routes so GET always matches
app.get('/api/dashboard/stats', requireAdmin, getDashboardStats)
app.get('/api/admin/stats', requireAdmin, getDashboardStats)

// Health + error handler
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err)
  const status = Number(err.statusCode || 500)
  res.status(status).json({
    title: 'Internal Server Error',
    message: err.message || 'Something went wrong',
  })
})

const PORT = Number(process.env.PORT || 4000)

async function main() {
  const mongoUri = process.env.MONGODB_URI
  if (!mongoUri) {
    throw new Error('Missing MONGODB_URI in server environment')
  }

  await mongoose.connect(mongoUri)
  // eslint-disable-next-line no-console
  console.log('Connected to MongoDB')

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API running on http://localhost:${PORT}`)
  })
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})

