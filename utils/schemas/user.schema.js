const Joi = require('joi')

const userId = Joi.number().integer()
const userEmail = Joi.string().email()
const userPassword = Joi.string().min(8)
// const userRole = Joi.string().min(5)

const idUserSchema = Joi.object({
  id: userId.required()
})
const createUserSchema = Joi.object({
  email: userEmail.required(),
  password: userPassword.required()
  // role: userRole.required()
})

const updateUserSchema = Joi.object({
  email: userEmail,
  password: userPassword
  // role: userRole
})

const userSchemas = {
  createUserSchema,
  updateUserSchema,
  idUserSchema
}

module.exports = userSchemas
