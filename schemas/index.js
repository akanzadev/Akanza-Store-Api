const categorySchemas = require('./category.schema')
const productSchemas = require('./product.schema')
const userSchemas = require('./user.schema')

module.exports = { ...categorySchemas, ...productSchemas, ...userSchemas }
