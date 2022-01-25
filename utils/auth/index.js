const passport = require('passport')

const LocalStrategy = require('./strategies/local.strategies')
const JwtStrategy = require('./strategies/jwt.strategies')

passport.use(LocalStrategy)
passport.use(JwtStrategy)
