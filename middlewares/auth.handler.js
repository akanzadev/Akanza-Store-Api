const boom = require('@hapi/boom')

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers.api
  if (!apiKey) next(boom.unauthorized('No API key provided'))
  if (apiKey !== 123) next(boom.unauthorized('Invalid API key'))
  next()
}

module.exports = { checkApiKey }
