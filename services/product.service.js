const boom = require('@hapi/boom')
const { Op } = require('sequelize')
const { models } = require('../libs/postgres/sequalize')

class ProductsService {
  /* constructor () {
  } */

  async create (data) {
    const newProduct = await models.Product.create(data)
    if (!newProduct) throw boom.badRequest('Error in create product')
    return newProduct
  }

  async findAll ({ limit = 10, offset = 0, ...rest }) {
    const options = {
      include: ['category'],
      limit,
      offset,
      where: {}
    }
    if (rest.price) {
      options.where = {
        price: rest.price
      }
    }
    if (rest.price_max && rest.price_min) {
      options.where = {
        price: {
          [Op.between]: [rest.price_min, rest.price_max]
        }
      }
    }
    const products = await models.Product.findAll(options)
    if (products.length === 0) throw boom.notFound('No products found')
    return products
  }

  async findOne (id) {
    const product = await models.Product.findByPk(id, {
      include: ['category']
    })
    if (!product) throw boom.notFound('Product not found')
    return product
  }

  async update (id, changes) {
    const product = await this.findOne(id)
    if (!product) throw boom.notFound('Product not found')
    const updatedProduct = await product.update(changes)
    if (!updatedProduct) throw boom.badRequest('Error in update product')
    return updatedProduct
  }

  async delete (id) {
    const product = await this.findOne(id)
    if (!product) throw boom.notFound('Product not found')
    await product.destroy().catch(() => {
      throw boom.badRequest('Error in delete product')
    })
    return id
  }
}

module.exports = ProductsService
