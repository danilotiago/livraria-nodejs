const app = require('express')()
const routes = require('../app/routes/web')

routes(app)

module.exports = app