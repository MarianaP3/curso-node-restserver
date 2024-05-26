const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false
})

const dbConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log('Base de datos online')
  } catch (error) {
    console.error('Error a la hora de iniciar la base de datos:', error)
    throw new Error('Error a la hora de iniciar la base de datos')
  }
}

module.exports = { sequelize, dbConnection }
