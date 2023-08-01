const express = require('express')

// Ejercicio 2: crear servidor HTTP con Express
function startServer () {
  const app = express()
  const PORT = process.env.PORT ?? 1234

  app.disable('x-powered-by')
  app.use(express.json())

  app.all('/', (req, res) => {
    if (req.method === 'GET') {
      res.status(200).send('<h1>¡Hola mundo!</h1>')
    } else {
      res.status(405).end()
    }
  })

  app.all('/logo.webp', (req, res) => {
    if (req.method === 'GET') {
      res.status(200).type('image/webp').sendFile('assets/logo.webp', { root: __dirname })
    } else {
      res.status(405).end()
    }
  })

  app.all('/contacto', (req, res) => {
    if (req.method === 'POST') {
      res.status(201).json(req.body)
    } else {
      res.status(405).end()
    }
  })

  app.use((_, res) => {
    res.status(404).send('<h1>404</h1>')
  })

  const server = app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })

  return server
}

module.exports = {
  startServer
}
