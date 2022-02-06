const express = require('express')
const chargeFileHandler = require('../middlewares/files.handler')
const FileService = require('../services/files.service')

const router = express.Router()
const service = new FileService()

// POST /api/v1/files
router.post('/upload', [
  chargeFileHandler
], async (req, res, next) => {
  try {
    const file = req.file
    const fileUploaded = await service.uploadFile(file)
    res.status(201).json(fileUploaded)
  } catch (error) {
    next(error)
  }
})

module.exports = router
