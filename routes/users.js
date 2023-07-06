const { Router } = require('express')
/* ES Modules
import {check } from "express-validator" */
// CommonJS
const { check } = require('express-validator')

const { validarCampos, validarSince, validarLimit } = require('../middlewares/validate-fields')
const { isRoleValid, isEmailValid, userExistsById } = require('../helpers/db-validators')

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

router.post('/', [
  // middlewares
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('last_name', 'El apellido es obligatorio').not().isEmpty(),
  check('email').custom((email) => isEmailValid(email)),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({ min: 8 }),
  check('occupation', 'La ocupación es obligatoria').not().isEmpty(),
  check('about_user', 'La información sobre ti es obligatoria').not().isEmpty(),
  // check('img', 'La fotografía es obligatoria').not().isEmpty(),
  validarCampos
], usuariosPost)

router.put('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(userExistsById),
  check('role').custom(isRoleValid),
  validarCampos
], usuariosPut)

router.patch('/', usuariosPatch)

router.delete('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(userExistsById),
  validarCampos
], usuariosDelete)

module.exports = router
