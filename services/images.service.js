const boom = require('@hapi/boom')
const cloudinary = require('../config/cloudinary')
const DatauriParser = require('datauri/parser')
const { models } = require('../libs/postgres/sequalize')
const path = require('path')
class ImagesService {
  /* constructor () {
  } */

  async create (data) {
    const newImage = await models.Image.create(data)
    if (!newImage) throw boom.badRequest('Error in create image')
    return newImage
  }

  async uploadToCloudinary (images, productId) {
    const imagesUrls = []
    await this.validateImagesForProduct(productId)
    for (const image of images) {
      const { originalname, buffer } = image
      const parser = new DatauriParser()
      parser.format(path.extname(originalname), buffer)
      if (!parser.content) {
        throw boom.boomify(
          new Error('Error al parsear el archivo buffer a string')
        )
      }
      const result = await cloudinary.uploader.upload(parser.content, {
        folder: 'akanza-store/products',
        public_id: `${productId}-${path.parse(originalname).name}`
      })
      if (!result) throw boom.badRequest('Error al subir imagen a Cloudinary')
      await this.create({
        url: result.secure_url,
        productId,
        title: result.public_id
      })
      imagesUrls.push(result.url)
    }
    return imagesUrls
  }

  async validateImagesForProduct (productId) {
    const images = await models.Image.findAll({
      where: {
        productId
      }
    })
    if (images.length >= 3) { throw boom.badRequest('Solo se permiten 3 imagenes por producto') }
    return true
  }

  async deleteFromCloudinary (images) {
    for (const image of images) {
      const publicId = image.title
      const result = await cloudinary.uploader.destroy(publicId)
      if (result.result !== 'ok') { throw boom.badRequest('Error al eliminar imagen de Cloudinary') }
    }
  }

  async findAll () {
    const images = await models.Image.findAll()
    return images.map((image) => image.url)
  }

  async addImagesToProducts (products) {
    const images = await models.Image.findAll({
      where: {
        productId: products.map((product) => product.id)
      },
      attributes: ['id', 'url', 'title', 'productId']
    })
    return products.map((product) => {
      const productImages = images.filter(
        (image) => image.productId === product.id
      )
      const productImagesUrls = productImages.map((image) => image.url)
      return {
        ...product.toJSON(),
        images: productImagesUrls
      }
    })
  }

  async findByProduct (productId) {
    const images = await models.Image.findAll({
      where: {
        productId
      }
    })
    return images.map((image) => image.url)
  }

  async update (id, changes) {}

  async deleteAllByProduct (idProduct) {
    const images = await models.Image.findAll({
      where: {
        productId: idProduct
      }
    })
    if (images.length === 0) /* throw boom.badRequest('No hay imagenes para eliminar') */ return true
    await this.deleteFromCloudinary(images)
    await models.Image.destroy({
      where: {
        productId: idProduct
      }
    })
  }
}

module.exports = ImagesService
