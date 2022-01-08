// const fs = require('fs')
const config = require('../config/config')

const USER = encodeURIComponent(config.DB.POSTGRES.DB_USER)
const PASSWORD = encodeURIComponent(config.DB.POSTGRES.DB_PASS)
const URI = `postgres://${USER}:${PASSWORD}@${config.DB.POSTGRES.DB_HOST}:${config.DB.POSTGRES.DB_PORT}/${config.DB.POSTGRES.DB_NAME}`

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    url: URI,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    url: URI,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true
      /* ssl: {
        ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
      } */
    }
  }
}
