const { Strategy, ExtractJwt } = require('passport-jwt')
const boom = require('@hapi/boom')
const UserService = require('../../../services/user.service')
const config = require('../../../config/config')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT.TOKEN_SECRET
}

const service = new UserService()

const JwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await service.findOne(payload.sub)
    if (!user) done(boom.unauthorized(), false)
    done(null, user)
  } catch (error) {
    done(error)
  }
})

module.exports = JwtStrategy
