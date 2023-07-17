/* eslint-disable camelcase */
const { response, request } = require('express')
const bcryptjs = require('bcryptjs')
// const { validationResult } = require('express-validator')

// const Usuario = require('../models/user').default
const Usuario = require('../models/user')

// const { ValidarCampos, validarLimit, validarSince } = require('../middlewares/validate-fields')

const usuariosGet = async (req = request, res = response) => { // la ruta se está estableciendo en server, al llamar
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
  const { __id, name, occupation, img, about_user/* , ...resto */ } = req.body

  // extracts a fragment of about 50 characters of "about user" information
  const aboutUserFragment = about_user.substring(0, 50)

  res.json({
    __id,
    name,
    occupation,
    img,
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
    occupation,
    about_user,
    img,
    status
  } = req.body

  const usuario = new Usuario({
    name,
    last_name,
    email,
    password,
    role,
    occupation,
    about_user,
    img,
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

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - controlador '
  })
}

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params
  // It uses SOFT delete due to the established terms
  const usuario = await Usuario.findByIdAndUpdate(id, { status: false })

  res.json(usuario)
}

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
  getAuthorInfo
}
