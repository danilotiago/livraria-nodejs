const homeRoutes = require('./home-routes')
const bookRoutes = require('./book-routes')

module.exports = (app) => {
    homeRoutes(app)
    bookRoutes(app)
}