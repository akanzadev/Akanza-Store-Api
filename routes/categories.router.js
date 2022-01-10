const express = require('express')

const CategoryService = require('./../services/category.service')
const validationHandler = require('../middlewares/validation.handler')
const {
  createCategorySchema,
  idCategorySchema,
  updateCategorySchema
} = require('../utils/schemas')

const router = express.Router()
const service = new CategoryService()

// GET /api/v1/categories
router.get('/', async (req, res, next) => {
  try {
    const categories = await service.findAll()
    res.json(categories)
  } catch (error) {
    next(error)
  }
})

// GET /api/v1/users/:id
router.get(
  '/:id',
  validationHandler(idCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const categories = await service.findOne(id)
      res.json(categories)
    } catch (error) {
      next(error)
    }
  }
)

// POST /api/v1/categories
router.post(
  '/',
  validationHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newCategory = await service.create(body)
      res.status(201).json(newCategory)
    } catch (error) {
      next(error)
    }
  }
)

// PATCH /api/v1/categories/:id
router.patch(
  '/:id',
  validationHandler(idCategorySchema, 'params'),
  validationHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const category = await service.update(id, body)
      res.json(category)
    } catch (error) {
      next(error)
    }
  }
)

// DELETE /api/v1/categories/:id
router.delete(
  '/:id',
  validationHandler(idCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      await service.delete(id)
      res.status(201).json({ id })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
