const Joi = require('joi')

const orderId = Joi.number().integer()
const orderCustomerId = Joi.number().integer()

const createOrderSchema = Joi.object({
  customerId: orderCustomerId.required()
})

const updateOrderSchema = Joi.object({
  customerId: orderCustomerId
})

const idOrderSchema = Joi.object({
  id: orderId.required()
})

const orderSchemas = {
  createOrderSchema,
  updateOrderSchema,
  idOrderSchema
}
module.exports = orderSchemas
