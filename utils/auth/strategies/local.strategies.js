const { Strategy } = require('passport-local')
const boom = require('@hapi/boom')
const UserService = require('../../../services/user.service')
const bcrypt = require('bcryptjs')

const service = new UserService()

const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await service.findByEmail(email)
    if (!user) done(boom.unauthorized('Invalid email or password'), false)
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) done(boom.unauthorized('Invalid email or password'), false)
    delete user.dataValues.password
    done(null, user)
  } catch (error) {
    done(error, false)
  }
})

module.exports = LocalStrategy
