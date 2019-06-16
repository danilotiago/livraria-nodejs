const { check } = require('express-validator/check')

class Book {
    static validations() {
        return [
    
            check('titulo').isLength({ min: 5 }).withMessage('O título deve ter pelo menos 5 caracteres'),
            check('preco').isCurrency().withMessage('O preço deve ser um valor monetário')
        
        ]
    }
}

module.exports = Book