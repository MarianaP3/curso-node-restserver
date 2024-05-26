/* eslint-disable camelcase */
const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/user')
const usuariosGet = async (req = request, res = response) => {
  const { limit = 5, since = 0 } = req.query
  const query = { status: true }

  const [total, usuarios] = await Promise.all([
    // It runs simultaneously
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip(since)
      .limit(limit)
  ])

  res.json({
    total,
    usuarios
  })
}

const getAuthorInfo = async (req = request, res = response) => {
  // find an author by their id
  // const { id } = req.params
  const { __id, name, last_name, about_user/* , ...resto */ } = req.body

  // extracts a fragment of about 300 characters of "about user" information
  const aboutUserFragment = about_user.substring(0, 300)

  res.json({
    __id,
    name,
    last_name,
    about_user: aboutUserFragment
  })
}

async function usuariosPost (req, res = response) {
  const {
    name,
    last_name,
    email,
    password,
    role,
    about_user,
    status
  } = req.body

  const usuario = new Usuario({
    name,
    last_name,
    email,
    password,
    role,
    about_user,
    status
  })

  // Encrypt the password
  const salt = bcryptjs.genSaltSync()
  usuario.password = bcryptjs.hashSync(password, salt)

  // Save in the database
  await usuario.save()

  res.json({
    usuario
  })
}

const usuariosPut = async (req, res = response) => {
  const { id } = req.params
  const { _id, password, ...resto } = req.body

  // Validate the passsword against the database
  if (password) {
    // Encrypt the password
    const salt = bcryptjs.genSaltSync()
    resto.password = bcryptjs.hashSync(password, salt)
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto)

  res.json(usuario)
}

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params
  // It uses SOFT delete due to the established terms
  const usuario = await Usuario.findByIdAndUpdate(id, { status: false })

  res.json(usuario)
}

const deactivateUsers = async (req, res = response) => {
  try {
    await Usuario.collection.updateMany({}, { $set: { status: false } })
    res.json('Usuarios desactivados')
  } catch (error) {
    res.json('No se pudieron desactivar los usuarios')
  }
}

const activateUsers = async (req, res = response) => {
  try {
    await Usuario.collection.updateMany({}, { $set: { status: true } })
    res.json('Usuarios activados')
  } catch (error) {
    res.json('No se pudieron activar los usuarios')
  }
}

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  getAuthorInfo,
  deactivateUsers,
  activateUsers
}
