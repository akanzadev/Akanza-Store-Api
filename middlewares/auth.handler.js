const boom = require('@hapi/boom')

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers.api
  if (!apiKey) next(boom.unauthorized('No API key provided'))
  if (apiKey !== 123) next(boom.unauthorized('Invalid API key'))
  next()
}

const checkAdminRole = (req, res, next) => {
  const role = req.user.role
  if (role !== 'admin') next(boom.unauthorized('You are not authorized'))
  next()
}

const checkRoles = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role
    if (!roles.includes(userRole)) next(boom.unauthorized('You are not authorized'))
    next()
  }
}

module.exports = { checkApiKey, checkAdminRole, checkRoles }
