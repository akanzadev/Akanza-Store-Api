const boom = require('@hapi/boom')
const { Postgres } = require('../libs/postgres/postgres')

class UserService {
  constructor () {
    this.client = new Postgres()
  }

  async create (data) {
    return data
  }

  async listUsers () {
    const result = await this.client.query('SELECT * FROM tasks')
    console.log(result.rows)
    if (!result.rows.length) throw boom.notFound('No users found')
    return result.rows
  }

  async findOne (id) {
    return { id }
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

module.exports = UserService
