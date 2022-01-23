const express = require('express')
const passport = require('passport')

const validationHandler = require('../middlewares/validation.handler')
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
      res.status(201).json(req.user)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
