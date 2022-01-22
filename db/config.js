// const fs = require('fs')
const config = require('../config/config')

module.exports = {
  development: {
    url: config.DB.POSTGRES.DB_URI,
    dialect: 'postgres'
  },
  test: {
    url: config.DB.POSTGRES.DB_URI,
    dialect: 'postgres'
  },
  production: {
    url: config.DB.POSTGRES.DB_URI,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}
