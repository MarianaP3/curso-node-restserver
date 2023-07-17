const { Router } = require('express')
/* ES Modules
import {check } from "express-validator" */
// CommonJS
const { check } = require('express-validator')
const { ROLES } = require('../constants')

const { validarCampos, validarSince, validarLimit } = require('../middlewares/validate-fields')
const { isEmailValid, userExistsById } = require('../helpers/db-validators')

const {
  usuariosGet,
  usuariosPost,
  usuariosPatch,
  usuariosDelete,
  usuariosPut
} = require('../controllers/usuarios')

const router = Router()

router.get('/', [
  validarSince,
  validarLimit
], usuariosGet)

router.get('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(userExistsById),
  validarCampos
], usuariosGet)

router.post('/', [
  // middlewares
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('last_name', 'El apellido es obligatorio').not().isEmpty(),
  check('email', 'El correo es obligatorio').not().isEmpty(),
  check('email').custom((email) => isEmailValid(email)),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({ min: 8 }),
  check('role', 'No es un rol válido').isIn(ROLES),
  check('occupation', 'La ocupación es obligatoria').not().isEmpty(),
  check('about_user', 'La información sobre ti es obligatoria').not().isEmpty(),
  // check('img', 'La fotografía es obligatoria').not().isEmpty(),
  validarCampos
], usuariosPost)

router.put('/:id', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('last_name', 'El apellido es obligatorio').not().isEmpty(),
  // check('email').custom((email) => isEmailValid(email)),
  check('email', 'El correo es obligatorio').not().isEmpty(),
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(userExistsById),
  // changing the password and the role is a separate endpoint
  // the user cannot change their role
  check('occupation', 'La ocupación es obligatoria').not().isEmpty(),
  check('about_user', 'La información sobre ti es obligatoria').not().isEmpty(),
  validarCampos
], usuariosPut)

router.patch('/', usuariosPatch)

router.delete('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(userExistsById),
  validarCampos
], usuariosDelete)

module.exports = router
