const boom = require('@hapi/boom')
const { models } = require('../libs/postgres/sequalize')
const bcrypt = require('bcryptjs')
// const sequelize = require('../libs/postgres/sequalize')
// const { Postgres } = require('../libs/postgres/postgres')

class UserService {
  /*  constructor () {
     this.client = new Postgres()
  } */

  async create (data) {
    const hash = await bcrypt.hash(data.password, 10)
    const newUser = await models.User.create({
      ...data,
      password: hash
    })
    if (!newUser) throw boom.badRequest('Error in create User')
    console.log(
      '🚀 ~ file: user.service.js ~ line 19 ~ UserService ~ create ~ newUser',
      newUser
    )
    delete newUser.dataValues.password
    return newUser
  }

  async findAll () {
    /* const result = await this.client.query('SELECT * FROM tasks')
    console.log(result.rows)
    if (!result.rows.length) throw boom.notFound('No users found')
    return result.rows */
    /* const [data, metadata] = await sequalize.query('SELECT * FROM tasks')
    if (!data.length === 0) throw boom.notFound('No users found')
    return data */
    const users = await models.User.findAll({
      include: ['customer'],
      attributes: {
        exclude: ['password', 'recoveryToken']
      }
    })
    if (!users.length === 0) throw boom.notFound('No users found')
    return users
  }

  async findOne (id) {
    const user = await models.User.findByPk(id, {
      attributes: {
        exclude: ['password', 'recoveryToken']
      }
    })
    if (!user) throw boom.notFound('User not found')
    return user
  }

  async findByEmail (email) {
    const user = await models.User.findOne({
      where: {
        email
      }
    })
    if (!user) throw boom.notFound('Not exist user with this email')
    return user
  }

  async update (id, changes) {
    const user = await this.findOne(id)
    if (!user) throw boom.notFound('User not found')
    const updatedUser = await user.update(changes)
    if (!updatedUser) throw boom.notFound('Error in update User')
    return updatedUser
  }

  async delete (id) {
    const user = await this.findOne(id)
    await user.destroy().catch(() => {
      throw boom.badRequest('Error in delete User')
    })
    return id
  }

  async getUserWithRecoveryToken (id) {
    const user = await models.User.findByPk(id)
    if (!user) throw boom.notFound('User not found')
    return user
  }
}

module.exports = UserService
