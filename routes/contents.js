const { Router } = require('express')
const { check } = require('express-validator')

const { validarCampos, validarSince, validarLimit } = require('../middlewares/validate-fields')
const { contentExistsById, isTopicValid, isTypeValid, isTitleValid, isLinkValid, userExistsById } = require('../helpers/db-validators')

const {
  getContentsByType,
  getContentsByTopic,
  getContentApprovedBy,
  getContentApprovedCreatedBy,
  getApprovedContents,
  getNotApprovedContents,
  contentsPost,
  contentsPut
} = require('../controllers/contenidos')

const router = Router()

router.get('/', [
  validarSince,
  validarLimit
], getContentsByType, getContentsByTopic, getContentApprovedBy,
getContentApprovedBy, getContentApprovedCreatedBy, getApprovedContents, getNotApprovedContents)

router.post('/', [
  // middlewares
  check('title', 'El titulo es obligatorio').not().isEmpty(),
  check('title').custom((title) => isTitleValid(title)),
  check('content', 'El contenido es obligatorio').not().isEmpty(),
  check('topic', 'El tema es obligatorio').not().isEmpty(),
  check('topic').custom((topic) => isTopicValid(topic)),
  check('type', 'El tipo es obligatorio').not().isEmpty(),
  check('type').custom((type) => isTypeValid(type)),
  check('approved', 'El approved es obligatorio').not().isEmpty(),
  check('author', 'El autor es obligatorio').not().isEmpty(),
  // revisar que el autor exista en la bd, crear middleware
  check('author').custom((author) => userExistsById(author)),
  // check('image', 'La imagen es obligatoria').not().isEmpty()
  check('link').custom((link) => isLinkValid(link)),
  validarCampos
], contentsPost)

router.put('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(contentExistsById),
  validarCampos
], contentsPut)

module.exports = router
