const Joi = require('joi')

const productId = Joi.string().uuid()
const productName = Joi.string().min(3).max(15)
const productPrice = Joi.number().integer().min(10)
const productImage = Joi.string().uri()

const createProductSchema = Joi.object({
  name: productName.required(),
  price: productPrice.required(),
  image: productImage.required()
})

const updateProductSchema = Joi.object({
  name: productName,
  price: productPrice,
  image: productImage
})

const idProductSchema = Joi.object({
  id: productId.required()
})

const productSchemas = {
  createProductSchema,
  updateProductSchema,
  idProductSchema
}
module.exports = productSchemas
