const BooksController = require('../controllers/BooksController')
const booksController = new BooksController()
const Book = require('../Models/Book')

module.exports = (app) => {
    
    app.get(BooksController.routes().index, booksController.index())

    app.get(BooksController.routes().new, booksController.new())

    app.post(BooksController.routes().store, Book.validations(), booksController.store())

    app.get(BooksController.routes().edit, booksController.edit())

    app.put(BooksController.routes().update, booksController.update())

    app.delete(BooksController.routes().delete, booksController.delete())
}