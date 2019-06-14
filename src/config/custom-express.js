const app = require('express')()
const routes = require('../app/routes/web')

require('marko/node-require').install()
require('marko/express')

routes(app)

module.exports = app