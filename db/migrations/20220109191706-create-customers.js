'use strict'
const { DataTypes } = require('sequelize')
const { USER_TABLE } = require('../models/user.model')
const { CUSTOMER_TABLE } = require('../models/customer.model')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(CUSTOMER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'last_name'
      },
      phone: {
        allowNull: true,
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: USER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(CUSTOMER_TABLE)
  }
}
