const { Model, DataTypes, Sequelize } = require('sequelize')
const { PRODUCT_TABLE } = require('./product.model')

const IMAGE_TABLE = 'images'

const ImagesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING
  },
  url: {
    allowNull: false,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Image extends Model {
  static associate (models) {
    this.belongsTo(models.Product, { as: 'product' })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: IMAGE_TABLE,
      modelName: 'Image',
      timestamps: false
    }
  }
}

module.exports = { Image, ImagesSchema, IMAGE_TABLE }
