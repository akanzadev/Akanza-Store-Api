const Joi = require('joi')

const orderId = Joi.number().integer()
const productId = Joi.number().integer()
const orderProductAmount = Joi.number().integer().min(1)

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: orderProductAmount.required()
})

const orderProductSchemas = {
  addItemSchema
}
module.exports = orderProductSchemas
