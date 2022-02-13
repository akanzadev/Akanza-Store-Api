const express = require('express')
const cors = require('cors')
// const morgan = require('morgan')
const path = require('path')
const routerApi = require('./routes')
const config = require('./config/config')
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  queryErrorHandler
} = require('./middlewares/error.handler')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(morgan('dev'))

/* const whitelist = ['http://localhost:4200', 'https://myapp.com']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('no permitido'))
    }
  }

} */
// Static Middleware
app.use('/api/v1/files', express.static(path.join(__dirname, 'public')))
// CORS
app.use(cors())
// Strategies for Auth
require('./utils/auth/index')

app.get('/', (req, res) => {
  res.send('Hola mi server en express')
})
// Set Routes
routerApi(app)

// Error Handler
app.use(logErrors)
app.use(queryErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(config.SERVER.PORT, () => {
  console.log('Running in Port: ' + port)
})
