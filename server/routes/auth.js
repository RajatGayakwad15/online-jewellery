const express = require('express')
const jwt = require('jsonwebtoken')
const { requireAuth } = require('../middlewares/auth')
const bcrypt = require('bcryptjs')

const User = require('../models/User')

const router = express.Router()

function getJwtSecret() {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('Missing JWT_SECRET')
  return secret
}

// Fixed credentials (as requested)
const ADMIN_EMAIL = 'yogita15@gmail.com'
const ADMIN_PASSWORD = 'Yogita@1503'

function signToken(user) {
  const payload = {
    sub: user.email,
    email: user.email,
    role: user.role,
    name: user.name,
  }

  return jwt.sign(payload, getJwtSecret(), { expiresIn: '7d' })
}

router.post('/login', (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) {
    return res.status(400).json({ title: 'Missing email/password' })
  }

  const normalizedEmail = String(email).toLowerCase()
  // Admin login
  if (normalizedEmail === ADMIN_EMAIL && String(password) === ADMIN_PASSWORD) {
    return res.json({
      token: signToken({ name: 'Admin', email: ADMIN_EMAIL, role: 'admin' }),
    })
  }

  // User login
  return User.findOne({ email: normalizedEmail })
    .then(async (user) => {
      if (!user) return res.status(401).json({ title: 'Unauthorized' })
      const ok = await bcrypt.compare(String(password), user.passwordHash)
      if (!ok) return res.status(401).json({ title: 'Unauthorized' })

      return res.json({ token: signToken(user) })
    })
    .catch(() => res.status(500).json({ title: 'Internal Server Error' }))
})

router.get('/me', requireAuth, (req, res) => {
  const user = req.user
  res.json({ data: user })
})

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body || {}
    if (!name || !email || !password) {
      return res.status(400).json({ title: 'Missing required fields' })
    }

    const normalizedEmail = String(email).toLowerCase()
    const existing = await User.findOne({ email: normalizedEmail })
    if (existing) return res.status(409).json({ title: 'Email already exists' })

    const passwordHash = await bcrypt.hash(String(password), 10)
    const created = await User.create({
      name: String(name),
      email: normalizedEmail,
      phone: String(phone || ''),
      passwordHash,
      role: 'user',
    })

    return res.status(201).json({ data: created })
  } catch (err) {
    return next(err)
  }
})

module.exports = router

