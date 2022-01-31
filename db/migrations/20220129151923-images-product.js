'use strict'
const { IMAGE_TABLE } = require('../models/images.model')
const { PRODUCT_TABLE } = require('../models/product.model')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(IMAGE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
      productId: {
        field: 'product_id',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: PRODUCT_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(IMAGE_TABLE)
  }
}
