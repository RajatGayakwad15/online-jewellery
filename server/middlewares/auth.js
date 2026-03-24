const jwt = require('jsonwebtoken')

function getJwtSecret() {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('Missing JWT_SECRET in server environment')
  }
  return secret
}

function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || ''
    const [type, token] = header.split(' ')
    if (type !== 'Bearer' || !token) {
      return res.status(401).json({ title: 'Unauthorized' })
    }

    const payload = jwt.verify(token, getJwtSecret())
    req.user = payload
    return next()
  } catch {
    return res.status(401).json({ title: 'Unauthorized' })
  }
}

function requireAdmin(req, res, next) {
  try {
    const header = req.headers.authorization || ''
    const [type, token] = header.split(' ')
    if (type !== 'Bearer' || !token) {
      return res.status(401).json({ title: 'Unauthorized' })
    }

    const payload = jwt.verify(token, getJwtSecret())
    const role = String(payload?.role ?? '').toLowerCase()
    if (role !== 'admin') {
      return res.status(403).json({
        title: 'Forbidden',
        message: 'Admin access required',
      })
    }
    req.user = payload
    return next()
  } catch {
    return res.status(401).json({ title: 'Unauthorized' })
  }
}

module.exports = { requireAuth, requireAdmin }

