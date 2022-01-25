const express = require('express')

const OrderService = require('../services/order.service')
const validationHandler = require('../middlewares/validation.handler')
const {
  createOrderSchema,
  idOrderSchema,
  updateOrderSchema,
  addItemSchema
} = require('../utils/schemas')
const passport = require('passport')

const router = express.Router()
const service = new OrderService()

// GET /api/v1/orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await service.findAll()
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

// GET /api/v1/orders/:id
router.get(
  '/:id',
  validationHandler(idOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const order = await service.findOne(id)
      res.json(order)
    } catch (error) {
      next(error)
    }
  }
)

// POST /api/v1/orders
router.post(
  '/',
  validationHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newOrder = await service.create(body)
      res.status(201).json(newOrder)
    } catch (error) {
      next(error)
    }
  }
)

// POST /api/v1/orders/ByUser
router.post(
  '/ByUser',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req
      const newOrder = await service.createWithUser(user.id)
      res.status(201).json(newOrder)
    } catch (error) {
      next(error)
    }
  }
)

// POST /api/v1/orders/add-item
router.post(
  '/add-item',
  validationHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const orderWithItem = await service.addItem(body)
      res.status(201).json(orderWithItem)
    } catch (error) {
      next(error)
    }
  }
)

// PATCH /api/v1/orders/:id
router.patch(
  '/:id',
  validationHandler(idOrderSchema, 'params'),
  validationHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const order = await service.update(id, body)
      res.json(order)
    } catch (error) {
      next(error)
    }
  }
)

// DELETE /api/v1/orders/:id
router.delete(
  '/:id',
  validationHandler(idOrderSchema, 'params'),
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
