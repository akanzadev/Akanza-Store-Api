const Joi = require('joi')

const authEmail = Joi.string().email()
const authPassword = Joi.string().min(3)

const loginAuthSchema = Joi.object({
  email: authEmail.required(),
  password: authPassword.required()
})

const authSchemas = { loginAuthSchema }

module.exports = authSchemas
