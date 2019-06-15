const app = require('express')()
const bodyParser = require('body-parser')
const routes = require('../app/routes/web')

require('marko/node-require').install()
require('marko/express')

app.use(bodyParser.urlencoded({
    extended: true
}))

routes(app)

module.exports = app