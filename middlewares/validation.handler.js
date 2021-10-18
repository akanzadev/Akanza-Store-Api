const boom = require('@hapi/boom')

function validateWithJoi (data, schema) {
  // Validar el schema con joi
  const { error } = schema.validate(data)
  return error
}

function validationHandler (schema, check = 'body') {
  return function (req, res, next) {
    const error = validateWithJoi(req[check], schema)
    error ? next(boom.badRequest(error)) : next()
  }
}

module.exports = validationHandler
