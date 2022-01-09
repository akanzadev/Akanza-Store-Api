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

// GET /api/v1/users
router.get('/', async (req, res, next) => {
  try {
    const users = await service.findAll()
    res.json(users)
  } catch (error) {
    next(error)
  }
})

// GET /api/v1/users/:id
router.get(
  '/:id',
  validationHandler(idUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await service.findOne(id)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }
)

// POST /api/v1/users
router.post(
  '/',
  validationHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newUser = await service.create(body)
      res.status(201).json(newUser)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)

// PATCH /api/v1/users/:id
router.patch(
  '/:id',
  validationHandler(idUserSchema, 'params'),
  validationHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const updatedUser = await service.update(id, body)
      res.json(updatedUser)
    } catch (error) {
      next(error)
    }
  }
)

// DELETE /api/v1/users/:id
router.delete(
  '/:id',
  validationHandler(idUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const idUserDeleted = await service.delete(id)
      res.status(201).json({ idUserDeleted })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
