const boom = require('@hapi/boom')
const { models } = require('../libs/postgres/sequalize')
class OrderService {
  /* constructor () {} */
  async create (data) {
    const newOrder = await models.Order.create(data)
    if (!newOrder) throw boom.badRequest('Error in create order')
    return newOrder
  }

  async findAll () {
    const orders = await models.Order.findAll()
    if (orders.length === 0) throw boom.notFound('No orders found')
    return orders
  }

  async findOne (id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
          /* attributes:{
            include: ['id', 'name', 'email', 'phone']
          } */
        }
      ]
    })
    if (!order) throw boom.notFound('Order not found')
    return order
  }

  async update (id, changes) {
    return {
      id,
      changes
    }
  }

  async delete (id) {
    return { id }
  }
}

module.exports = OrderService
