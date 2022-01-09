const { Sequelize } = require('sequelize')
const config = require('../../config/config')
const setupModels = require('../../db/models')

if (config.DB.TYPE_DB === 'postgres') {
  const USER = encodeURIComponent(config.DB.POSTGRES.DB_USER)
  const PASSWORD = encodeURIComponent(config.DB.POSTGRES.DB_PASS)
  const URI = `postgres://${USER}:${PASSWORD}@${config.DB.POSTGRES.DB_HOST}:${config.DB.POSTGRES.DB_PORT}/${config.DB.POSTGRES.DB_NAME}`
  console.log(URI)
  const sequelize = new Sequelize(URI, {
    dialect: 'postgres'
  })

  setupModels(sequelize)

  sequelize.sync().then(() => {
    console.log('Database & tables created!')
  }).catch(err => {
    console.log('Error creating database in postgres: ', err)
  })

  module.exports = sequelize
} else if (config.DB.TYPE_DB === 'mysql') {
  const USER = encodeURIComponent(config.DB.MYSQL.DB_USER)
  const PASSWORD = encodeURIComponent(config.DB.MYSQL.DB_PASS)
  const URI = `mysql://${USER}:${PASSWORD}@${config.DB.MYSQL.DB_HOST}:${config.DB.MYSQL.DB_PORT}/${config.DB.MYSQL.DB_NAME}`

  const sequelize = new Sequelize(URI, {
    dialect: 'mysql'
  })

  setupModels(sequelize)
  /*
  sequelize.sync().then(() => {
    console.log('Database & tables created!')
  }).catch(err => {
    console.log('Error creating database in mysql: ', err)
  }) */

  module.exports = sequelize
}
