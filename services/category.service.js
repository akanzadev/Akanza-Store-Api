const boom = require('@hapi/boom')
const { models } = require('../libs/postgres/sequalize')

class CategoryService {
  /*  constructor () {
  } */

  async create (data) {
    const newCategory = await models.Category.create(data)
    if (!newCategory) throw boom.badRequest('Error in create category')
    return newCategory
  }

  async findAll () {
    const categories = await models.Category.findAll()
    if (categories.length === 0) throw boom.notFound('No categories found')
    return categories
  }

  async findOne (id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    })
    if (!category) throw boom.notFound('Category not found')
    return category
  }

  async update (id, changes) {
    const category = await this.findOne(id)
    if (!category) throw boom.notFound('Category not found')
    const updatedCategory = await category.update(changes)
    if (!updatedCategory) throw boom.badRequest('Error in update category')
    return updatedCategory
  }

  async delete (id) {
    const category = await this.findOne(id)
    if (!category) throw boom.notFound('Category not found')
    await category.destroy().catch(() => {
      throw boom.badRequest('Error in delete category')
    })
    return id
  }
}

module.exports = CategoryService
