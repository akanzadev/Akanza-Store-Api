const boom = require('@hapi/boom')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const config = require('../config/config')

const { signPayload } = require('../utils/helpers/jwt.handler')
const UserService = require('./user.service')

const service = new UserService()

class AuthService {
  /*  constructor () {
  } */

  async getUser ({ email, password }) {
    const user = await service.findByEmail(email).catch((e) => {
      throw boom.unauthorized('Invalid email or password')
    })
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw boom.unauthorized('Invalid email or password')
    delete user.dataValues.password
    return user
  }

  generateJWT (user) {
    const token = signPayload({
      sub: user.id,
      role: user.role
    })
    return {
      user,
      token
    }
  }

  async sendEmail (email) {
    const user = await service.findByEmail(email)
    if (!user) throw boom.unauthorized()
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: false, // true for 465, false for other ports
      port: 587,
      auth: {
        user: config.MAIL.MAIL_USER,
        pass: config.MAIL.MAIL_PASS
      }
    })
    // send mail with defined transport object
    await transporter.sendMail({
      from: config.MAIL.MAIL_USER, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>' // html body
    })
    return {
      message: 'Email sent'
    }
  }

  async getProfile (user) {
    const rta = await service.findOne(user.id)
    if (!rta) throw boom.unauthorized()
    return rta
  }
}

module.exports = AuthService
