const templates = require('../views/templates')
const BooksController = require('../controllers/BooksController')

class LoginController {

    static routes() {
        return {
            login: '/login'
        }
    }

    index() {
        return function(req, resp) {
            // templates.home.login
            resp.marko(require('../views/base/login/login.marko'))
        }
    }

    login() {
        return function(req, resp, next) {
            const passport = req.passport
            
            passport.authenticate('local', (error, user, info) => {
                if (info) {
                    // templates.home.login
                    return resp.marko(require('../views/base/login/login.marko'))
                }

                if (error) {
                    return next(error)
                }

                req.login(user, (error) => {
                    if (error) {
                        return next(error)
                    }

                    return resp.redirect(BooksController.routes().index)
                })
            })(req, resp, next)
        }
    }

}

module.exports = LoginController