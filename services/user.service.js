const boom = require('@hapi/boom')
const { models } = require('../libs/postgres/sequalize')
// const sequelize = require('../libs/postgres/sequalize')
// const { Postgres } = require('../libs/postgres/postgres')

class UserService {
  /*  constructor () {
     this.client = new Postgres()
  } */

  async create (data) {
    const newUser = await models.User.create(data)
    return newUser
  }

  async listUsers () {
    /* const result = await this.client.query('SELECT * FROM tasks')
    console.log(result.rows)
    if (!result.rows.length) throw boom.notFound('No users found')
    return result.rows */
    /* const [data, metadata] = await sequalize.query('SELECT * FROM tasks')
    if (!data.length === 0) throw boom.notFound('No users found')
    return data */
    const data = await models.User.findAll()
    if (!data.length === 0) throw boom.notFound('No users found')
    return data
  }

  async findOne (id) {
    console.log('findOne, id: ', id)
    const user = await models.User.findByPk(id)
    if (!user) throw boom.notFound('User not found')
    return user
  }

  async update (id, changes) {
    const user = await this.findOne(id)
    const updatedUser = await user.update(changes)
    if (!updatedUser) throw boom.notFound('Error in update User')
    return updatedUser
  }

  async delete (id) {
    const user = await this.findOne(id)
    await user.destroy()
    return { id }
  }
}

module.exports = UserService
