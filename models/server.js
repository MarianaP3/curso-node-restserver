const express = require('express')
// const cors = require('cors')*

const { dbConnection } = require('../database/config')
class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT
    this.usuariosPath = '/api/usuarios'
    this.contenidosPath = '/api/contents'
    // Conectar a base de datos
    this.conectarDB()

    // Middlewares
    this.middlewares()

    // Rutas de mi applicación
    this.routes()
  }

  async conectarDB () {
    await dbConnection()
  }

  middlewares () {
    // CORS
    this.app.use(express.static('public'))

    // Lectura y Parseo del body
    this.app.use(express.json())

    // Directorio Público
    this.app.use(express.static('public'))
  }

  routes () {
    this.app.use(this.usuariosPath, require('../routes/users'))
    this.app.use(this.contenidosPath, require('../routes/contents'))
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log('Running server in port ', this.port)
    })
  }
}

module.exports = Server // exporta el servidor
