const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('../app/routes/web')
const methodOverride = require('method-override')

require('marko/node-require').install()
require('marko/express')

app.use('/static', express.static('src/app/public'))

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        const method = req.body._method
        delete req.body._method
      
      return method
    }
}))

routes(app)

module.exports = app