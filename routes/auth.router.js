const express = require('express')
const passport = require('passport')

const validationHandler = require('../middlewares/validation.handler')
const AuthService = require('../services/auth.service')
const { loginAuthSchema } = require('../utils/schemas')

const router = express.Router()
const service = new AuthService()

// POST /api/v1/auth/login
router.post(
  '/login',
  [
    validationHandler(loginAuthSchema, 'body'),
    passport.authenticate('local', { session: false })
  ],
  async (req, res, next) => {
    try {
      const { user } = req
      const rta = service.generateJWT(user)
      res.status(201).json(rta)
    } catch (error) {
      next(error)
    }
  }
)

// POST /api/v1/auth/validate-token
router.get(
  '/validate-token',
  [
    passport.authenticate('jwt', { session: false })],
  async (req, res, next) => {
    try {
      const { user } = req
      console.log(user)
      const rta = service.generateJWT(user)
      res.status(201).json(rta)
    } catch (error) {
      next(error)
    }
  }
)

// POST /api/v1/auth/recovery
router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body
    const rta = await service.sendRecovery(email)
    res.status(200).json(rta)
  } catch (error) {
    next(error)
  }
})

// POST /api/v1/auth/change-password
router.post('/change-password', async (req, res, next) => {
  try {
    const { token, newPassword } = req.body
    const rta = await service.changePassword(token, newPassword)
    res.json(rta)
  } catch (error) {
    next(error)
  }
})

// POST /api/v1/auth/profile
router.get(
  '/profile',
  [passport.authenticate('jwt', { session: false })],
  async (req, res, next) => {
    try {
      const { user } = req
      const rta = await service.getProfile(user)
      res.status(201).json(rta)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
