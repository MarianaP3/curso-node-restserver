const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN)

    console.log('Base de datos online')
  } catch (error) {
    console.log(error)
    throw new Error('Error a la hora de iniciar la base de datos')
  }
}

module.exports = {
  dbConnection
}
/*
const mongoose = require('mongoose');

async function dbConnection() {
  const uri = 'mongodb://localhost:27017/nombre-de-tu-base-de-datos';
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión exitosa a la base de datos.');
  } catch (error) {
    console.error('Error a la hora de iniciar la base de datos', error);
    throw new Error('Error a la hora de iniciar la base de datos');
  }
}

module.exports = dbConnection;

*/
