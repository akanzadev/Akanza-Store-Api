const express = require('express')
const cors = require('cors')
const routerApi = require('./routes')
const config = require('./config/config')
const {
  logErrors,
  errorHandler,
  boomErrorHandler
} = require('./middlewares/error.handler')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const whitelist = ['http://localhost:8080', 'https://myapp.com']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(options))

app.get('/', (req, res) => {
  res.send('Hola mi server en express')
})

// Set Routes
routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(config.SERVER.PORT, () => {
  console.log('Running in Port: ' + port)
})
