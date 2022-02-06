const multer = require('multer')
const boom = require('@hapi/boom')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
  destination: 'public/uploads',
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(boom.boomify(new Error('Solo se permite archivos de tipo Image'), { statusCode: 400 }))
  }
}

const limits = 1000000

module.exports = {
  storage,
  fileFilter,
  limits
}
