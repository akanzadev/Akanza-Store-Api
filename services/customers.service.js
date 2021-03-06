const boom = require('@hapi/boom')
const { models } = require('../libs/postgres/sequalize')

class CustomerService {
  // constructor () {}

  async findAll () {
    const customers = await models.Customer.findAll({
      include: ['user']
    })
    if (customers.length === 0) throw boom.notFound('No customers found')
    return customers
  }

  async findOne (id) {
    const customer = await models.Customer.findByPk(id, {
      include: ['user']
    })
    if (!customer) throw boom.notFound('customer not found')
    return customer
  }

  async create (data) {
    // TODO: CREATE USER AND ASSOCIATE WITH CUSTOMER
    /* const newUser = await models.User.create(data.user)
    if (!newUser) throw boom.notFound('Error in create customer with User')
    console.log({ ...data })
    const newCustomer = await models.Customer.create({
      ...data,
      userId: newUser.id
    }) */
    /* const hash = await bcrypt.hash(data.user.password, 10) */
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    })
    console.log('🚀 ~ file: customers.service.js ~ line 35 ~ CustomerService ~ create ~ newCustomer', newCustomer)
    if (!newCustomer) throw boom.notFound('Error in create customer')
    return newCustomer
    /* const newCustomer = await models.Customer.create({
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    }, {
      include: ['user']
    })
    delete newCustomer.dataValues.user.dataValues.password
    if (!newCustomer) throw boom.notFound('Error in create customer')
    return newCustomer */
  }

  async update (id, changes) {
    const model = await this.findOne(id)
    const updatedCustomer = await model.update(changes)
    if (!updatedCustomer) throw boom.notFound('Error in update customer')
    return updatedCustomer
  }

  async delete (id) {
    const customer = await this.findOne(id)
    await customer.destroy().catch(() => {
      throw boom.badRequest('Error in delete customer')
    })
    return id
  }
}

module.exports = CustomerService
