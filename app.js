require('dotenv').config()
const Server = require('./models/server')
const { sequelize } = require('./database/config')
const User = require('./models/user')
const Content = require('./models/content')
const Movement = require('./models/movement')
const Role = require('./models/role')
const Topic = require('./models/topic')
const Type = require('./models/type')

const server = new Server()

const startServer = async () => {
  try {
    // Sincronizar los modelos
    await sequelize.sync({ force: false }) // Usa { force: true } para recrear las tablas en cada inicio (cuidado en producción)

    // Iniciar el servidor
    server.listen()
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

startServer()
