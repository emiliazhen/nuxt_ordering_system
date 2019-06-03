const {
  Nuxt,
  Builder
} = require('nuxt')
const opn = require('opn')
const express = require('express')

// const api = require('./api')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 8089
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.set('port', port)

// Import API Routes
// app.use('/api', api)
// Start nuxt.js
async function start () {
  // Import and Set Nuxt.js options
  let config = require('../nuxt.config.js')
  config.dev = !(process.env.NODE_ENV === 'production')
  // Instanciate nuxt.js
  const nuxt = await new Nuxt(config)
  // Add nuxt.js middleware
  app.use(nuxt.render)
  // Build in development
  if (config.dev) {
    try {
      const builder = new Builder(nuxt)
      await builder.build()
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
      process.exit(1)
    }
  }
  // Listen the server
  app.listen(port, host)
  const _url = 'http://' + host + ':' + port
  console.log('Server listening on ' + _url) // eslint-disable-line no-console
  opn(_url)
}

start()
