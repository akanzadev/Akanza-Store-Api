const dotenv = require('dotenv')
// Config dotenv
dotenv.config({ path: './utils/envs/.env' })
const config = {
  SERVER: {
    PORT: process.env.PORT || 3000,
    MODE: process.env.NODE_ENV || 'development'
  },
  DB: {
    TYPE_DB: process.env.TYPE_DB || 'postgres',
    MYSQL: {
      DB_HOST: process.env.DB_HOST || 'localhost',
      DB_PORT: process.env.DB_PORT || 7800,
      DB_NAME: process.env.DB_NAME || 'my_store',
      DB_USER: process.env.DB_USER || 'root',
      DB_PASS: process.env.DB_PASS || 'admin',
      DB_URI: process.env.DATABASE_URL || 'mysql://root:admin@localhost:7800/my_store'
    },
    POSTGRES: {
      DB_HOST: process.env.DB_HOST || 'localhost',
      DB_PORT: process.env.DB_PORT || 5432,
      DB_NAME: process.env.DB_NAME || 'my_store',
      DB_USER: process.env.DB_USER || 'root',
      DB_PASS: process.env.DB_PASS || 'admin',
      DB_URI: process.env.DATABASE_URL || 'postgres://root:admin@localhost:5432/my_store'
    }
  },
  JWT: {
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'dev',
    TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION || '1h'
  },
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUDINARY_NAME || 'akanza',
    API_KEY: process.env.CLOUDINARY_API_KEY || '12312321312321',
    API_SECRET: process.env.CLOUDINARY_API_SECRET || 'XEiI1sd3EoR34dfd4YhG_ln4'
  },
  MAIL: {
    /* MAIL_HOST: process.env.MAIL_HOST || 'smtp.gmail.com',
    MAIL_PORT: process.env.MAIL_PORT || 587, */
    MAIL_USER: process.env.MAIL_USER || '',
    MAIL_PASS: process.env.MAIL_PASS || ''
  }
}

module.exports = config
