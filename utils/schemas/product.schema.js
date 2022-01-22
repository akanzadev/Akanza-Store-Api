const Joi = require('joi')

const productId = Joi.number().integer()
const productName = Joi.string().min(3).max(15)
const productPrice = Joi.number().integer().min(10)
const productDescription = Joi.string().min(10)
const productImage = Joi.string().uri()
const productCategoryId = Joi.number().integer()
const productLimit = Joi.number().integer().min(1)
const productOffset = Joi.number().integer().min(0)

const productPriceMin = Joi.number().integer()
const productPriceMax = Joi.number().integer()

const createProductSchema = Joi.object({
  name: productName.required(),
  price: productPrice.required(),
  image: productImage.required(),
  description: productDescription.required(),
  categoryId: productCategoryId.required()
})

const updateProductSchema = Joi.object({
  name: productName,
  price: productPrice,
  image: productImage,
  description: productDescription,
  categoryId: productCategoryId
})

const idProductSchema = Joi.object({
  id: productId.required()
})

const paginationSchema = Joi.object({
  limit: productLimit,
  offset: productOffset,
  price: productPrice,
  price_min: productPriceMin,
  price_max: productPriceMax.when('price_min', {
    is: Joi.number().integer().required(),
    then: Joi.required()
  })
})

const productSchemas = {
  createProductSchema,
  updateProductSchema,
  idProductSchema,
  paginationSchema
}
module.exports = productSchemas
