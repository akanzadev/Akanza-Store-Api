const jwt = require('jsonwebtoken')
const config = require('../../config/config')
const boom = require('@hapi/boom')
const signPayload = (payload, duration = '1h') => {
  return jwt.sign(payload, config.JWT.TOKEN_SECRET, {
    expiresIn: duration
  })
}

const decodedToken = (token) => {
  try {
    return jwt.verify(token, config.JWT.TOKEN_SECRET)
  } catch (error) {
    throw boom.unauthorized('Invalid token')
  }
}

module.exports = {
  signPayload,
  decodedToken

}
