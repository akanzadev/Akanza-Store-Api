const dotenv = require('dotenv')
// Config dotenv
dotenv.config({ path: './utils/envs/.env' })
const config = {
  SERVER: {
    PORT: process.env.PORT || 3000,
    MODE: process.env.NODE_ENV || 'development'
  },
  DB: {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || 5432,
    DB_NAME: process.env.DB_NAME || 'my_store',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASS: process.env.DB_PASS || 'admin'
  },
  JWT: {
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'dev',
    TOKEN_EXPIRATION: process.env.TOKEN_EXPIRATION || '1h'
  },
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUDINARY_NAME || 'akanza',
    API_KEY: process.env.CLOUDINARY_API_KEY || '12312321312321',
    API_SECRET: process.env.CLOUDINARY_API_SECRET || 'XEiI1sd3EoR34dfd4YhG_ln4'
  }
}

module.exports = config
