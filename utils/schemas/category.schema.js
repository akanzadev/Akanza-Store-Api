const Joi = require('joi')

const categoryId = Joi.number().integer()
const categoryName = Joi.string().min(3).max(15)
const categoryImage = Joi.string().uri()

const createCategorySchema = Joi.object({
  name: categoryName.required(),
  image: categoryImage.required()
})

const updateCategorySchema = Joi.object({
  name: categoryName,
  image: categoryImage
})

const idCategorySchema = Joi.object({
  id: categoryId.required()
})

const categorySchemas = {
  createCategorySchema,
  updateCategorySchema,
  idCategorySchema
}

module.exports = categorySchemas
