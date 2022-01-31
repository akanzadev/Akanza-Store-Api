const { v2: cloudinary } = require('cloudinary')
const config = require('./config')
cloudinary.config({
  cloud_name: config.CLOUDINARY.CLOUD_NAME,
  api_key: config.CLOUDINARY.API_KEY,
  api_secret: config.CLOUDINARY.API_SECRET
})
module.exports = cloudinary
