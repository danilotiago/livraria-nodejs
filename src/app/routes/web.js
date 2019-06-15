const BooksDAO = require('../DAO/booksDAO')
const db = require('../../config/database')

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
        resp.marko(require('../views/books/form.marko'))
    })

    app.post('/livros', function(req, resp) {
        console.log(req.body)
    })
}