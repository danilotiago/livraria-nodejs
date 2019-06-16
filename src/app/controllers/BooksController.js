class BooksController {

    index() {
        return function(req, resp) {

            const booksDAO = new BooksDAO(db)
    
            booksDAO.get()
                .then(books => resp.marko(
                    require('../views/books/list.marko'),
                    {
                        books
                    }
                ))
                .catch(err => console.log(err))
        }
    }

    new() {
       return function(req, resp) {
            resp.marko(require('../views/books/form.marko'), {book: {} })
        } 
    }

    store() {
        return function(req, resp) {

            const errors = validationResult(req)
    
            if (! errors.isEmpty()) {
                return resp.marko(require('../views/books/form.marko'), {
                    book: req.body,
                    errors: errors.array() 
                })
            }
            
            const booksDAO = new BooksDAO(db)
    
            booksDAO.store(req.body)
                .then(resp.redirect('/livros'))
                .catch(err => console.log(err))
        }
    }

    edit() {
        return function(req, resp) {
        
            const id       = req.params.id
            const booksDAO = new BooksDAO(db)
    
            booksDAO.find(id)
                .then(book => {
                    resp.marko(require('../views/books/form.marko'),
                        { book }
                    )
                })
                .catch(err => console.log(err))
        }
    }

    update() {
        return function(req, resp) {

            const id   = req.params.id
            const data = req.body
            const booksDAO = new BooksDAO(db)
    
            booksDAO.update(data, id)
                .then(resp.redirect('/livros'))
                .catch(err => console.log(err))
        }
    }

    delete() {
        return function(req, resp) {
        
            const id = req.params.id
            const booksDAO = new BooksDAO(db)
    
            console.log(booksDAO)
    
            booksDAO.destroy(id)
                .then(() => resp.status(200).end())
                .catch(err => console.log(err))
        }
    }
}

module.exports = BooksController