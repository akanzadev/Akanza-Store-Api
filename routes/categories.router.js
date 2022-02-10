const express = require('express')

const CategoryService = require('./../services/category.service')
const validationHandler = require('../middlewares/validation.handler')
const {
  createCategorySchema,
  idCategorySchema,
  updateCategorySchema,
  paginationSchemaWithCategory
} = require('../utils/schemas')
const passport = require('passport')
const { checkRoles } = require('../middlewares/auth.handler')
const ProductsService = require('../services/product.service')

const router = express.Router()
const service = new CategoryService()
const productService = new ProductsService()

// GET /api/v1/categories
router.get('/', async (req, res, next) => {
  try {
    const categories = await service.findAll()
    res.json(categories)
  } catch (error) {
    next(error)
  }
})

// GET /api/v1/categories/:id
router.get(
  '/:id',
  validationHandler(idCategorySchema, 'params'),
  validationHandler(paginationSchemaWithCategory, 'query'),
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

// GET /api/v1/categories/:id/products
router.get(
  '/:id/products',
  validationHandler(idCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const categories = await productService.listProductsByCategory({
        categoryId: id,
        ...req.query
      })
      res.json(categories)
    } catch (error) {
      next(error)
    }
  }
)

// POST /api/v1/categories
router.post(
  '/',
  [
    passport.authenticate('jwt', { session: false }),
    checkRoles('admin'),
    validationHandler(createCategorySchema, 'body')
  ],
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
