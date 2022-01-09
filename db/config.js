// const fs = require('fs')
const config = require('../config/config')

const USER = encodeURIComponent(config.DB.POSTGRES.DB_USER)
const PASSWORD = encodeURIComponent(config.DB.POSTGRES.DB_PASS)
const URI = `postgres://${USER}:${PASSWORD}@${config.DB.POSTGRES.DB_HOST}:${config.DB.POSTGRES.DB_PORT}/${config.DB.POSTGRES.DB_NAME}`
module.exports = {
  development: {
    url: URI,
    dialect: 'postgres'
  },
  test: {
    url: URI,
    dialect: 'postgres'
  },
  production: {
    url: URI,
    dialect: 'postgres'
  }
}
