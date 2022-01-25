const express = require('express')
const passport = require('passport')

const OrderService = require('../services/order.service')

const router = express.Router()
const service = new OrderService()

// POST /api/v1/profile/my-orders
router.get(
  '/my-orders',
  [
    passport.authenticate('jwt', { session: false })
  ],
  async (req, res, next) => {
    try {
      const { user } = req
      const orders = await service.findAllByUser(user.id)
      res.status(201).json({
        orders
      })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
