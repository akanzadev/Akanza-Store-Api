const express = require('express')

const productsRouter = require('./products.router')
const categoriesRouter = require('./categories.router')
const usersRouter = require('./users.router')
const customerRouter = require('./customers.router')
const orderRouter = require('./orders.router')
const authRouter = require('./auth.router')
const profileRouter = require('./profile.router')
const fileRouter = require('./files.router')
function routerApi (app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/products', productsRouter)
  router.use('/categories', categoriesRouter)
  router.use('/users', usersRouter)
  router.use('/customers', customerRouter)
  router.use('/orders', orderRouter)
  router.use('/auth', authRouter)
  router.use('/profile', profileRouter)
  router.use('/files', fileRouter)
}

module.exports = routerApi
