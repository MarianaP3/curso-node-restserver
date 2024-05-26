/* eslint-disable camelcase */
const { Schema, model } = require('mongoose')
const { ROLES } = require('../constants')

const UsuarioSchema = Schema({
  user_id: {
    type: Number,
    required: [true]
  },
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
    enum: Object.values(ROLES)
  },
  about_user: {
    type: String,
    required: [true, 'La información sobre ti es obligatoria']
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
