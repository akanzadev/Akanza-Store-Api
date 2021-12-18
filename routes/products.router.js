const express = require('express')

const ProductsService = require('./../services/product.service')
const validationHandler = require('../middlewares/validation.handler')
const {
  createProductSchema,
  idProductSchema,
  updateProductSchema
} = require('../utils/schemas')

const router = express.Router()
const service = new ProductsService()

router.get('/', async (req, res, next) => {
  try {
    const products = await service.find()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

router.get(
  '/:id',
  validationHandler(idProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await service.findOne(id)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/',
  validationHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newProduct = await service.create(body)
      res.status(201).json(newProduct)
    } catch (error) {
      next(error)
    }
  }
)

router.patch(
  '/:id',
  validationHandler(idProductSchema, 'params'),
  validationHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const product = await service.update(id, body)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/:id',
  validationHandler(idProductSchema, 'params'),
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
