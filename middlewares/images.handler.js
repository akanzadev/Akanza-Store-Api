const multer = require('multer')
const { fileFilter, limits, storage } = require('../config/multer')
const chargeImageHandler = multer({
  storage,
  fileFilter
  /*  limits: {
    fileSize: limits,
    files: 3
  } */
}).array('images', 3)

module.exports = chargeImageHandler
