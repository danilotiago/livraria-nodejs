class BooksDAO {
    constructor(db) {
        this._db = db
    }

    get() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (err, books) => {
                    if (err) return reject(err)
                    
                    return resolve(books)
                }
            )
        })
    }

    find(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                'SELECT * FROM livros WHERE id = ?',
                [id],
                (err, book) => {
                    if (err) return reject(err)
                
                    return resolve(book)
                }
            )
        })
    }

    store(data) {
        return new Promise((resolve, reject) => {
            this._db.run(
                'INSERT INTO livros (titulo, preco, descricao) VALUES (?, ?, ?) ',
                [data.titulo, data.preco, data.descricao],
                (err) => {
                    if (err) {
                        console.log(err)
                        return reject('Não foi possível adicionar o livro')
                    }
                    return resolve()
                }
            )
        })
    }

    update(data, id) {
        return new Promise((resolve, reject) => {
            this._db.run(
                'UPDATE livros SET titulo = ?, preco = ?, descricao = ? WHERE id = ?',
                [data.titulo, data.preco, data.descricao, id],
                (err) => {
                    if (err) {
                        console.log(err)
                        return reject('Não foi possível remover o livro')
                    }
                    return resolve()
                }
            )
        })
    }

    destroy(id) {
        return new Promise((resolve, reject) => {
            this._db.run(
                'DELETE FROM livros WHERE id = ?',
                [id],
                (err) => {
                    if (err) {
                        console.log(err)
                        return reject('Não foi possível remover o livro')
                    }
                    return resolve()
                }
            )
        })
    }
}

module.exports = BooksDAO