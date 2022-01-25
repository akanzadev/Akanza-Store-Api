const express = require('express')
const passport = require('passport')

const validationHandler = require('../middlewares/validation.handler')
const { signPayload } = require('../utils/helpers/jwt.handler')
const { loginAuthSchema } = require('../utils/schemas')
const router = express.Router()

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
      const token = signPayload({
        sub: user.id,
        role: user.role
      })
      res.status(201).json({
        user,
        token
      })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
