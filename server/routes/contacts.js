const express = require('express')
const Contact = require('../models/Contact')
const { requireAdmin } = require('../middlewares/auth')

const router = express.Router()

// Public: submit contact form
router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body || {}
    if (!name || !email || !message) {
      return res.status(400).json({ title: 'Missing required fields' })
    }
    const created = await Contact.create({
      name: String(name),
      email: String(email),
      phone: String(phone || ''),
      subject: String(subject || ''),
      message: String(message),
    })
    res.status(201).json({ data: created })
  } catch (err) {
    next(err)
  }
})

// Admin: list contacts
router.get('/', requireAdmin, async (req, res, next) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 })
    res.json({ data: contacts })
  } catch (err) {
    next(err)
  }
})

// Admin: delete contact
router.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ title: 'Contact not found' })
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

// Admin: get single contact
router.get('/:id', requireAdmin, async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) return res.status(404).json({ title: 'Contact not found' })
    res.json({ data: contact })
  } catch (err) {
    next(err)
  }
})

module.exports = router

