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
            this._db.all(
                'SELECT * FROM livros',
                (err, books) => {
                    if (err) return reject(err)
                    
                    return resolve(books)
                }
            )
        })
    }
}

module.exports = BooksDAO