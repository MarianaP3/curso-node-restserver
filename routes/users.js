const { Router } = require('express')
const { check } = require('express-validator')
const { ROLES } = require('../constants')

const {
  validarCampos, validarSince, validarLimit, isEmailValid, userExistsById
} = require('../middlewares/index')

const {
  usuariosGet,
  usuariosPost,
  // eslint-disable-next-line no-unused-vars
  usuariosPatch,
  usuariosDelete,
  usuariosPut,
  deactivateUsers,
  activateUsers
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
  check('about_user', 'La información sobre ti es obligatoria').not().isEmpty(),
  validarCampos
], usuariosPost)

router.put('/:id', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('last_name', 'El apellido es obligatorio').not().isEmpty(),
  check('email', 'El correo es obligatorio').not().isEmpty(),
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(userExistsById),
  check('about_user', 'La información sobre ti es obligatoria').not().isEmpty(),
  validarCampos
], usuariosPut)

// endpoints that uses 'updateMany'
router.put('/', activateUsers, deactivateUsers)

router.patch('/ruta', (req, res) => {
  const mensaje = 'usersPatch'
  res.send(mensaje)
})

router.delete('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(userExistsById),
  validarCampos
], usuariosDelete)

module.exports = router
