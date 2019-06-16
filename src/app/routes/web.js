const BooksDAO = require('../DAO/booksDAO')
const db = require('../../config/database')
const { check, validationResult } = require('express-validator/check')

module.exports = (app) => {
    app.get('/', function(req, resp) {
        resp.send(`
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1>Casa do código</h1>
                </body>
            </html>
        `)
    })
    
    app.get('/livros', function(req, resp) {

        const booksDAO = new BooksDAO(db)

        booksDAO.get()
            .then(books => resp.marko(
                require('../views/books/list.marko'),
                {
                    books
                }
            ))
            .catch(err => console.log(err))
    })

    app.get('/livros/novo', function(req, resp) {
        resp.marko(require('../views/books/form.marko'), {book: {} })
    })

    app.post('/livros', [
    
        check('titulo').isLength({ min: 5 }),
        check('preco').isCurrency()
    
    ], function(req, resp) {

        const errors = validationResult(req)

        if (! errors.isEmpty()) {
            return resp.marko(require('../views/books/form.marko'), {book: {} })
        }
        
        const booksDAO = new BooksDAO(db)

        booksDAO.store(req.body)
            .then(resp.redirect('/livros'))
            .catch(err => console.log(err))
    })

    app.get('/livros/:id/edit', function(req, resp) {
        
        const id       = req.params.id
        const booksDAO = new BooksDAO(db)

        booksDAO.find(id)
            .then(book => {
                resp.marko(require('../views/books/form.marko'),
                    { book }
                )
            })
            .catch(err => console.log(err))
    })

    app.put('/livros/:id', function(req, resp) {

        const id   = req.params.id
        const data = req.body
        const booksDAO = new BooksDAO(db)

        booksDAO.update(data, id)
            .then(resp.redirect('/livros'))
            .catch(err => console.log(err))
    })

    app.delete('/livros/:id', function(req, resp) {
        
        const id = req.params.id
        const booksDAO = new BooksDAO(db)

        console.log(booksDAO)

        booksDAO.destroy(id)
            .then(() => resp.status(200).end())
            .catch(err => console.log(err))
    })
}