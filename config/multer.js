const multer = require('multer')
const boom = require('@hapi/boom')

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/webp'
  ) {
    cb(null, true)
  } else {
    // Enviar error
    cb(null, false)
    // Crear error para capturarlo con boom
    cb(
      boom.boomify(new Error('Solo se permiten imagenes'), { statusCode: 400 })
    )
  }
}

const limits = 100000

module.exports = {
  storage,
  fileFilter,
  limits
}
