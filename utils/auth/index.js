const passport = require('passport')

const LocalStrategy = require('./strategies/local.strategies')

passport.use(LocalStrategy)
