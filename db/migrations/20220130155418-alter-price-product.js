'use strict'

const { PRODUCT_TABLE } = require('../models/product.model')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(PRODUCT_TABLE, 'price', {
      type: Sequelize.DOUBLE
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(PRODUCT_TABLE, 'price', {
      type: Sequelize.INTEGER
    })
  }
}
