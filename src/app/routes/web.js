const homeRoutes = require('./home-routes')
const bookRoutes = require('./book-routes')
const loginRoutes = require('./login-routes')

module.exports = (app) => {
    homeRoutes(app)
    bookRoutes(app)
    loginRoutes(app)
}