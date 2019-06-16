const BooksDAO = require('../DAO/booksDAO')
const db = require('../../config/database')
const { check, validationResult } = require('express-validator/check')

const HomeControlller = require('../controllers/HomeControlller')
const homeController = new HomeControlller()

const BooksController = require('../controllers/BooksController')
const booksController = new BooksController()

module.exports = (app) => {
    app.get('/', homeController.index())
    
    app.get('/livros', booksController.index())

    app.get('/livros/novo', booksController.new())

    app.post('/livros', [
    
        check('titulo').isLength({ min: 5 }).withMessage('O título deve ter pelo menos 5 caracteres'),
        check('preco').isCurrency().withMessage('O preço deve ser um valor monetário')
    
    ], booksController.store())

    app.get('/livros/:id/edit', booksController.edit())

    app.put('/livros/:id', booksController.update())

    app.delete('/livros/:id', booksController.delete())
}