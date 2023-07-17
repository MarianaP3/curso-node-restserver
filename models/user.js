/* eslint-disable camelcase */
const { Schema, model } = require('mongoose')
const { ROLES } = require('../constants')
// const { appConfig } = require('../database/config')

const UsuarioSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  last_name: {
    type: String,
    required: [true, 'El apellido es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  role: {
    type: String,
    required: [true, 'El rol es obligatorio'],
    enum: Object.values(ROLES)
  },
  occupation: {
    type: String,
    required: [true, 'La ocupación es obligatoria']
  },
  about_user: {
    type: String,
    required: [true, 'La información sobre ti es obligatoria']
  },
  img: {
    type: String
    // required: [true, 'La fotografía es requerida']
  },
  status: {
    type: Boolean,
    default: true
  }
})

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, ...usuario } = this.toObject()
  return usuario
}

module.exports = model('Usuario', UsuarioSchema)
