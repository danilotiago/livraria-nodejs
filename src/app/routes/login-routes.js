const LoginController = require('../controllers/LoginController')
const loginController = new LoginController()

module.exports = (app) => {
    
    app.route(LoginController.routes().login)
        .get(loginController.index())
        .post(loginController.login())
}