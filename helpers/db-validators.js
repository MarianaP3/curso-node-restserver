const Usuario = require('../models/user')
const Contenido = require('../models/content')
const Topic = require('../models/topic')
const Type = require('../models/type')

const isTopicValid = async (topic = '') => {
  const existeTema = await Topic.findOne({ topic })
  if (!existeTema) {
    throw new Error('El tema ' + topic + ' no es valido')
  }
}

const isTypeValid = async (type = '') => {
  const existeTipo = await Type.findOne({ type })
  if (!existeTipo) {
    throw new Error('El tipo ' + type + ' no es valido')
  }
}

const isEmailValid = async (email = '') => {
  // Verify if the mail exists
  const existeEmail = await Usuario.findOne({ email })
  if (existeEmail) {
    throw new Error('El correo ' + email + ' ya está registrado')
  }
}

const userExistsById = async (id) => {
  // Verify if the user exist by id
  const existeUsuario = await Usuario.findById(id)
  if (!existeUsuario) {
    throw new Error('El usuario de id: ' + id + ' no existe')
  }
}

const contentExistsById = async (id) => {
  // Verify if the content exists by id
  const existeContenido = await Contenido.findById(id)
  if (!existeContenido) {
    throw new Error('El contenido de id: ' + id + ' no existe')
  }
}

module.exports = { // exports an object
  isEmailValid,
  userExistsById,
  contentExistsById,
  isTopicValid,
  isTypeValid
}
