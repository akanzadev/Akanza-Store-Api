'use strict'

const { ORDER_TABLE, OrderSchema } = require('../models/order.model')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(ORDER_TABLE, OrderSchema)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(ORDER_TABLE)
  }
}
