const multer = require('multer')
const { fileFilter, limits, storage } = require('../config/multer.local')
const chargeFileHandler = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: limits
  }
}).single('file')

module.exports = chargeFileHandler
