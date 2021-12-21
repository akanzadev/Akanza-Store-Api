function logErrors (err, req, res, next) {
  if (process.env.MODE === 'development') {
    console.error('Log Error', err)
  }
  next(err)
}
function queryErrorHandler (err, req, res, next) {
  if (err.parent) {
    const { fields, parent } = err
    return res.status(500).json({
      field: fields,
      message: parent.detail
    })
  }
  next(err)
}
function errorHandler (err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}
function boomErrorHandler (err, req, res, next) {
  if (err.isBoom) {
    const { output } = err
    return res.status(output.statusCode).json(output.payload)
  }
  next(err)
}

module.exports = { logErrors, errorHandler, boomErrorHandler, queryErrorHandler }
