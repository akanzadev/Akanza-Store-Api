const boom = require('@hapi/boom')
const { Op } = require('sequelize')
const { models } = require('../libs/postgres/sequalize')
const ImagesService = require('./images.service')

class ProductsService {
  constructor () {
    this.imageService = new ImagesService()
  }

  /**
   * @description Create a new product
   * @param {Object} data
   * @returns {Object}
   */
  async create (data, images) {
    const newProduct = await models.Product.create(data)
    if (!newProduct) throw boom.badRequest('Error in create product')
    if (!images) return newProduct
    const imagesUrls = await this.imageService.uploadToCloudinary(images, newProduct.id)
    return {
      ...newProduct.toJSON(),
      images: imagesUrls
    }
  }

  /**
   * @description Find all products
   * @param {Object} query
   * @returns {Array}
   */
  async findAll ({ limit = 50, offset = 0, ...rest }) {
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
    return await this.imageService.addImagesToProducts(products)
  }

  async findOne (id) {
    const product = await models.Product.findByPk(id, {
      include: ['category']
    })
    if (!product) throw boom.notFound('Product not found')
    const images = await this.imageService.findByProduct(product.id)
    return {
      ...product.toJSON(),
      images
    }
  }

  async update (id, changes) {
    const product = await models.Product.findByPk(id)
    if (!product) throw boom.notFound('Product not found')
    const updatedProduct = await product.update(changes)
    if (!updatedProduct) throw boom.badRequest('Error in update product')
    const images = await this.imageService.findByProduct(product.id)
    return {
      ...updatedProduct.toJSON(),
      images
    }
  }

  async delete (id) {
    await this.imageService.deleteAllByProduct(id)
    const product = await models.Product.findByPk(id)
    if (!product) throw boom.notFound('Product not found')
    await product.destroy().catch((e) => {
      throw boom.badRequest('Error in delete product', e)
    })
    return {
      ok: true,
      id,
      message: 'Product deleted'
    }
  }
}

module.exports = ProductsService
