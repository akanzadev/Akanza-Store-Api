'use strict'

const { DataTypes } = require('sequelize')

const { CUSTOMER_TABLE } = require('../models/customer.model')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true
    })
  },

  down: async (queryInterface, Sequelize) => {
  }
}
