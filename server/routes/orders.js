const express = require('express')
const Order = require('../models/Order')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 })
    res.json({ data: orders })
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ title: 'Order not found' })
    res.json({ data: order })
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { shipping, paymentMethod, items } = req.body || {}
    if (!shipping || !paymentMethod || !Array.isArray(items)) {
      return res.status(400).json({ title: 'Missing required fields' })
    }

    const username =
      req.user?.email || req.user?.sub || req.user?.username || ''

    const created = await Order.create({
      user: { username },
      shipping,
      paymentMethod,
      items,
    })

    res.status(201).json({ data: created })
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ title: 'Order not found' })
    res.json({ data: updated })
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ title: 'Order not found' })
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

module.exports = router

