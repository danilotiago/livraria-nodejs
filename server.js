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

