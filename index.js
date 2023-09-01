const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

// Ejercicio 1: crear servidor HTTP con Node
function startServer () {
  const desiredPort = process.env.PORT ?? 1234

  const processRequest = (req, res) => {
    const { method, url } = req
    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    switch (url) {
      case '/': {
        if (method === 'GET') {
          res.statusCode = 200
          res.end('<h1>¡Hola mundo!</h1>')
        } else {
          res.statusCode = 405
          res.end()
        }
        break
      }
      case '/logo.webp': {
        if (method === 'GET') {
          fs.readFile(path.resolve(__dirname, './assets/logo.webp'), (err, data) => {
            if (err) {
              res.statusCode = 500
              res.end('<h1>500 Internal Server Error</h1>')
            } else {
              res.statusCode = 200
              res.setHeader('Content-Type', 'image/webp')
              res.end(data)
            }
          })
        } else {
          res.statusCode = 405
          res.end()
        }
        break
      }
      case '/contacto': {
        if (method === 'POST') {
          let body = ''

          req.on('data', chunk => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
            res.end(JSON.stringify(data))
          })
        } else {
          res.statusCode = 405
          res.end()
        }
        break
      }
      default:
        res.statusCode = 404
        return res.end('<h1>404</h1>')
    }
  }

  const server = http.createServer(processRequest)

  server.listen(desiredPort, () => {
    console.log(`server listening on port http://localhost:${desiredPort}`)
  })

  return server
}

module.exports = {
  startServer
}
