const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('../app/routes/web')

require('marko/node-require').install()
require('marko/express')

app.use('/static', express.static('src/app/public'))

app.use(bodyParser.urlencoded({
    extended: true
}))

routes(app)

module.exports = app