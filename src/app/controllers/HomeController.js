class HomeController
{
    index() {
        return function(req, resp) {
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
        }
    }
}

module.exports = HomeController