const { Category, CategorySchema } = require('./category.model')
const { Customer, CustomerSchema } = require('./customer.model')
const { ImagesSchema, Image } = require('./images.model')
const { OrderProduct, OrderProductSchema } = require('./order-product.model')
const { Order, OrderSchema } = require('./order.model')
const { Product, ProductSchema } = require('./product.model')
const { User, UserSchema } = require('./user.model')

function setupModels (sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Customer.init(CustomerSchema, Customer.config(sequelize))
  Category.init(CategorySchema, Category.config(sequelize))
  Product.init(ProductSchema, Product.config(sequelize))
  Image.init(ImagesSchema, Image.config(sequelize))
  Order.init(OrderSchema, Order.config(sequelize))
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize))

  User.associate(sequelize.models)
  Customer.associate(sequelize.models)
  Category.associate(sequelize.models)
  Product.associate(sequelize.models)
  Image.associate(sequelize.models)
  Order.associate(sequelize.models)
}

module.exports = setupModels
