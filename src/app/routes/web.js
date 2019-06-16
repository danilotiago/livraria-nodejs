const { check } = require('express-validator/check')

const HomeController = require('../controllers/HomeController')
const homeController = new HomeController()

const BooksController = require('../controllers/BooksController')
const booksController = new BooksController()

module.exports = (app) => {
    app.get('/', homeController.index())
    
    app.get(BooksController.routes().index, booksController.index())

    app.get(BooksController.routes().new, booksController.new())

    app.post(BooksController.routes().store, [
    
        check('titulo').isLength({ min: 5 }).withMessage('O título deve ter pelo menos 5 caracteres'),
        check('preco').isCurrency().withMessage('O preço deve ser um valor monetário')
    
    ], booksController.store())

    app.get(BooksController.routes().edit, booksController.edit())

    app.put(BooksController.routes().update, booksController.update())

    app.delete(BooksController.routes().delete, booksController.delete())
}