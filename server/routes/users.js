const express = require('express')
const User = require('../models/User')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 })
    res.json({ data: users })
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ title: 'User not found' })
    res.json({ data: user })
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ title: 'User not found' })
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

module.exports = router
