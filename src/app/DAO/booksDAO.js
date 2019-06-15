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
}

module.exports = BooksDAO