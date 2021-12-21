const express = require('express')

const UserService = require('./../services/user.service')
const validationHandler = require('../middlewares/validation.handler')
const {
  updateUserSchema,
  createUserSchema,
  idUserSchema
} = require('../utils/schemas')

const router = express.Router()
const service = new UserService()

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.listUsers()
    res.json(categories)
  } catch (error) {
    next(error)
  }
})

router.get(
  '/:id',
  validationHandler(idUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const category = await service.findOne(id)
      res.json(category)
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/',
  validationHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newCategory = await service.create(body)
      res.status(201).json(newCategory)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)

router.patch(
  '/:id',
  validationHandler(idUserSchema, 'params'),
  validationHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      console.log(id)
      const body = req.body
      const category = await service.update(id, body)
      res.json(category)
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/:id',
  validationHandler(idUserSchema, 'params'),
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
