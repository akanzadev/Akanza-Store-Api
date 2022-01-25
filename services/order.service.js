const boom = require('@hapi/boom')
const { models } = require('../libs/postgres/sequalize')
class OrderService {
  /* constructor () {} */
  async create (data) {
    const newOrder = await models.Order.create(data)
    if (!newOrder) throw boom.badRequest('Error in create order')
    return newOrder
  }

  async createWithUser (userId) {
    const customer = await models.Customer.findOne({
      where: {
        '$user.id$': userId
      },
      include: ['user']
    })
    console.log('🚀 ~ file: order.service.js ~ line 24 ~ OrderService ~ createWithUser ~ customer', customer)
    if (!customer) throw boom.notFound('Customer not found')
    const newOrder = await models.Order.create({ customerId: customer.id })
    if (!newOrder) throw boom.badRequest('Error in create order')
    return newOrder
  }

  async addItem (data) {
    const orderWithItem = await models.OrderProduct.create(data)
    if (!orderWithItem) throw boom.badRequest('Error in add item')
    return orderWithItem
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
        },
        'items'
      ]
    })
    if (!order) throw boom.notFound('Order not found')
    return order
  }

  async findAllByUser (userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    })
    if (orders.length === 0) throw boom.notFound('No orders found')
    return orders
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
