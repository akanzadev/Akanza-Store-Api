const boom = require('@hapi/boom')
const { models } = require('../libs/postgres/sequalize')

class ProductsService {
  /* constructor () {
  } */

  async create (data) {
    const newProduct = await models.Product.create(data)
    if (!newProduct) throw boom.badRequest('Error in create product')
    return newProduct
  }

  async findAll () {
    const products = await models.Product.findAll()
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
