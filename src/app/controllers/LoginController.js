const templates = require('../views/templates')

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
        return function(req, resp) {

        }
    }

}

module.exports = LoginController