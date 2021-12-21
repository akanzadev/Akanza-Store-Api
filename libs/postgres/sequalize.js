const { Sequelize } = require('sequelize')
const config = require('../../config/config')
const setupModels = require('../../db/models')

const USER = encodeURIComponent(config.DB.DB_USER)
const PASSWORD = encodeURIComponent(config.DB.DB_PASS)
const URI = `postgres://${USER}:${PASSWORD}@${config.DB.DB_HOST}:${config.DB.DB_PORT}/${config.DB.DB_NAME}`

const sequelize = new Sequelize(URI, {
  dialect: 'postgres'
})

setupModels(sequelize)

sequelize.sync()

module.exports = sequelize
