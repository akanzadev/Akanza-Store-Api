const categorySchemas = require('./category.schema')
const customerSchemas = require('./customer.schema')
const productSchemas = require('./product.schema')
const userSchemas = require('./user.schema')
const orderSchemas = require('./order.schema')
const orderProductSchemas = require('./order-product.schema')

module.exports = {
  ...customerSchemas,
  ...categorySchemas,
  ...productSchemas,
  ...userSchemas,
  ...orderSchemas,
  ...orderProductSchemas
}
