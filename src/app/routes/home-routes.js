const HomeController = require('../controllers/HomeController')
const homeController = new HomeController()

module.exports = (app) => {
    app.get(HomeController.routes().index, homeController.index())
}