const boom = require('@hapi/boom')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const config = require('../config/config')
const { signPayload, decodedToken } = require('../utils/helpers/jwt.handler')
const UserService = require('./user.service')

class AuthService {
  constructor () {
    this.service = new UserService()
  }

  async getUser ({ email, password }) {
    const user = await this.service.findByEmail(email).catch((e) => {
      throw boom.unauthorized('Invalid email or password')
    })
    console.log(user)
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw boom.unauthorized('Invalid email or password')
    }
    delete user.dataValues.password
    delete user.dataValues.recoveryToken
    return user
  }

  async sendRecovery (email) {
    const user = await this.service.findByEmail(email)
    if (!user) throw boom.unauthorized()
    const { token } = this.generateJWT(user, '1m')
    const userUpdated = await this.service.update(user.id, {
      recoveryToken: token
    })
    const link = `http://localhost:4200/recovery/change-password?token=${userUpdated.recoveryToken}`
    const mail = {
      from: config.MAIL.MAIL_USER,
      to: `${user.email}`,
      subject: 'Email para recuperar contraseña',
      html: `<b>Ingresa a este link => ${link}</b>`
    }
    const rta = await this.sendMail(mail)
    return rta
  }

  generateJWT (user, duration = '1h') {
    const token = signPayload(
      {
        sub: user.id,
        role: user.role
      },
      duration
    )
    return {
      user,
      token
    }
  }

  decodedJWT (token) {
    const payload = decodedToken(token)
    if (!payload) throw boom.unauthorized()
    return payload
  }

  async sendMail (infoEmail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      // secure: false, // true for 465, false for other ports
      // port: 587,
      secure: true,
      port: 465,
      auth: {
        user: config.MAIL.MAIL_USER,
        pass: config.MAIL.MAIL_PASS
      }
    })
    // send mail with defined transport object
    await transporter.sendMail(infoEmail)
    return {
      message: 'Email sent'
    }
  }

  async getProfile (user) {
    const rta = await this.service.findOne(user.id)
    if (!rta) throw boom.unauthorized()
    return rta
  }

  async changePassword (token, newPassword) {
    const payload = this.decodedJWT(token)
    const user = await this.service.getUserWithRecoveryToken(payload.sub)
    if (user.recoveryToken !== token) {
      throw boom.unauthorized('Invalid token in reset password')
    }
    const hash = await bcrypt.hash(newPassword, 10)
    await this.service.update(user.id, { recoveryToken: null, password: hash })
    return { message: 'password changed' }
  }
}

module.exports = AuthService
