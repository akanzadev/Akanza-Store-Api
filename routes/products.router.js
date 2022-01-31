const express = require('express')

const ProductsService = require('./../services/product.service')
const validationHandler = require('../middlewares/validation.handler')
const {
  createProductSchema,
  idProductSchema,
  updateProductSchema,
  paginationSchema
} = require('../utils/schemas')
const chargeImageHandler = require('../middlewares/images.handler')

const router = express.Router()
const service = new ProductsService()

// GET /api/v1/products
router.get(
  '/',
  validationHandler(paginationSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.findAll(req.query)
      res.json(products)
    } catch (error) {
      next(error)
    }
  }
)

// GET /api/v1/products/:id
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

// POST /api/v1/products
router.post(
  '/',
  [chargeImageHandler, validationHandler(createProductSchema, 'body')],
  async (req, res, next) => {
    try {
      const body = req.body
      const newProduct = await service.create(body, req.files)
      res.status(201).json(newProduct)
    } catch (error) {
      next(error)
    }
  }
)

// PATCH /api/v1/products/:id
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

// PUT /api/v1/products/:id
router.put(
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

// DELETE /api/v1/products/:id
router.delete(
  '/:id',
  validationHandler(idProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const rta = await service.delete(id)
      res.status(201).json(rta)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
