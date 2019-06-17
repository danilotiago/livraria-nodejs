const BooksDAO = require('../DAO/booksDAO')
const db = require('../../config/database')
const { validationResult } = require('express-validator/check')
const templates = require('../views/templates')

class BooksController {

    static routes() {
        return {
            authenticated: '/livros*',
            index: '/livros',
            new: '/livros/novo',
            store: '/livros',
            edit: '/livros/:id/edit',
            update: '/livros/:id',
            delete: '/livros/:id'
        }
    }

    index() {
        return function(req, resp) {

            const booksDAO = new BooksDAO(db)
    
            booksDAO.get()
                .then(books => resp.marko(
                    templates.books.index, { books }
                ))
                .catch(err => console.log(err))
        }
    }

    new() {
       return function(req, resp) {
            resp.marko(templates.books.form, {book: {} })
        } 
    }

    store() {
        return function(req, resp) {

            const errors = validationResult(req)
    
            if (! errors.isEmpty()) {
                //console.log(req.header('Referer'))
                return resp.marko(templates.books.form, { book: req.body, errors: errors.array() }
                )
            }
            
            const booksDAO = new BooksDAO(db)
    
            booksDAO.store(req.body)
                .then(resp.redirect(BooksController.routes().index))
                .catch(err => console.log(err))
        }
    }

    edit() {
        return function(req, resp) {
        
            const id       = req.params.id
            const booksDAO = new BooksDAO(db)
    
            booksDAO.find(id)
                .then(book => {
                    resp.marko(templates.books.form, { book }
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
                .then(resp.redirect(BooksController.routes().index))
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