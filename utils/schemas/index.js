const categorySchemas = require('./category.schema')
const customerSchemas = require('./customer.schema')
const productSchemas = require('./product.schema')
const userSchemas = require('./user.schema')

module.exports = {
  ...customerSchemas,
  ...categorySchemas,
  ...productSchemas,
  ...userSchemas
}
