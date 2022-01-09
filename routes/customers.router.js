const express = require('express')

const CustomerService = require('../services/customers.service')

const validationHandler = require('../middlewares/validation.handler')
const { createCustomerSchema, idCustomerSchema, updateCustomerSchema } = require('../utils/schemas')

const router = express.Router()
const service = new CustomerService()

// GET /api/v1/customers
router.get('/', async (req, res, next) => {
  try {
    const customers = await service.findAll()
    res.json(customers)
  } catch (error) {
    next(error)
  }
})

// GET /api/v1/customers/:id
router.get(
  '/:id',
  validationHandler(idCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const customer = await service.findOne(id)
      res.json(customer)
    } catch (error) {
      next(error)
    }
  }
)

// POST /api/v1/customers
router.post('/',
  validationHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newCustomer = await service.create(body)
      res.status(201).json(newCustomer)
    } catch (error) {
      next(error)
    }
  }
)

// PATCH /api/v1/customers/:id
router.patch('/:id',
  validationHandler(idCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const updatedCustomer = await service.update(id, body)
      res.status(201).json(updatedCustomer)
    } catch (error) {
      next(error)
    }
  }
)

// DELETE /api/v1/customers/:id
router.delete('/:id',
  validationHandler(idCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const idCustomerDeleted = await service.delete(id)
      res.status(200).json({ idCustomerDeleted })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
