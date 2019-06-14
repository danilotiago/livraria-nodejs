const app = require('./src/config/custom-express')

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
    resp.send(`
        <html>
            <head>
                <meta charset="utf-8">
            </head>
            <body>
                <h1>Todos os livros</h1>
            </body>
        </html>
    `)
})

app.listen(3000, function() {
    console.log('Servidor iniciado')
})

/*
const http = require('http')

const server = http.createServer((req, resp) => {
    resp.end(`
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

server.listen(3000)
*/
