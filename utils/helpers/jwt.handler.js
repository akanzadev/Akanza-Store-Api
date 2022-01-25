const jwt = require('jsonwebtoken')
const config = require('../../config/config')
const signPayload = (payload) => {
  return jwt.sign(payload, config.JWT.TOKEN_SECRET)
}
const decodedToken = (token) => {
  return jwt.decode(token, config.JWT.TOKEN_SECRET)
}

module.exports = {
  signPayload,
  decodedToken
}
