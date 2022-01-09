const Joi = require('joi')

const customerId = Joi.number().integer()
const customerName = Joi.string().min(3).max(30)
const customerLastName = Joi.string()
const customerPhone = Joi.string()
const customerUserId = Joi.number().integer()
const customerEmail = Joi.string().email()
const customerPassword = Joi.string()

const idCustomerSchema = Joi.object({
  id: customerId.required()
})

const createCustomerSchema = Joi.object({
  name: customerName.required(),
  lastName: customerLastName.required(),
  phone: customerPhone.required(),
  user: Joi.object({
    email: customerEmail.required(),
    password: customerPassword.required()
  })
})

const updateCustomerSchema = Joi.object({
  name: customerName,
  lastName: customerLastName,
  phone: customerPhone,
  userId: customerUserId
})

const customerSchemas = {
  idCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema
}

module.exports = customerSchemas
