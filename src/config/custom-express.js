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

app.use(function(req, resp, next) {
    return resp.status(404).marko(
        require('../app/views/base/errors/404.marko')
    )
})

app.use(function(error, req, resp, next) {
    return resp.status(500).marko(
        require('../app/views/base/errors/500.marko')
    )
})

module.exports = app