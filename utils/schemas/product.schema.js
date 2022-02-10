const Joi = require('joi')

const productId = Joi.number().integer()
const productName = Joi.string().min(3).max(25)
const productPrice = Joi.number().precision(2)
const productDescription = Joi.string().min(10)
// array de imagenes
const productImages = Joi.array().items(Joi.string().uri())
const productImage = Joi.string().uri()
const productCategoryId = Joi.number().integer()
const productLimit = Joi.number().integer().min(1)
const productOffset = Joi.number().integer().min(0)

const productPriceMin = Joi.number().integer()
const productPriceMax = Joi.number().integer()

const createProductSchema = Joi.object({
  name: productName.required(),
  price: productPrice.required(),
  images: productImages.optional(),
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

const paginationSchemaWithCategory = paginationSchema.keys({
  categoryId: productCategoryId
})

const productSchemas = {
  createProductSchema,
  updateProductSchema,
  idProductSchema,
  paginationSchema,
  paginationSchemaWithCategory
}
module.exports = productSchemas
