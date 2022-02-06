
class FileService {
  uploadFile (file) {
    console.log('🚀 ~ file: files.service.js ~ line 4 ~ FileService ~ uploadFile ~ file', file)
    return {
      filename: file.filename,
      location: `http://localhost:4600/api/v1/files/uploads/${file.filename}`,
      originalname: file.originalname
    }
  }
}

module.exports = FileService
