const express = require('express')
const Category = require('../models/Category')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 })
    res.json({ data: categories })
  } catch (err) {
    next(err)
  }
})

router.get('/:slug', async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug })
    if (!category) return res.status(404).json({ title: 'Category not found' })
    res.json({ data: category })
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { name, slug } = req.body || {}
    if (!name || !slug) return res.status(400).json({ title: 'Missing fields' })

    const created = await Category.create({ name, slug })
    res.status(201).json({ data: created })
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, slug } = req.body || {}
    const updated = await Category.findByIdAndUpdate(
      id,
      { ...(name ? { name } : {}), ...(slug ? { slug } : {}) },
      { new: true }
    )
    if (!updated) return res.status(404).json({ title: 'Category not found' })
    res.json({ data: updated })
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ title: 'Category not found' })
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

module.exports = router

