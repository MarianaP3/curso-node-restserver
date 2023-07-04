const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarSince, validarLimit } = require('../middlewares/validate-fields');
const { contentExistsById } = require('../helpers/db-validators');

const {
    getContentsByType, getContentsByTopic, getContentApprovedBy, getContentApprovedCreatedBy, getContentsByStatus, contentsPost, contentsPut
} = require('../controllers/contenidos');

const router = Router();

router.get('/', [
    validarSince,
    validarLimit
], getContentsByType, getContentsByTopic, getContentApprovedBy, 
   getContentApprovedBy, getContentApprovedCreatedBy, getContentsByStatus);

router.post('/', [
    //middlewares
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('content', 'El contenido es obligatorio').not().isEmpty(),
    check('topic', 'El tema es obligatorio').not().isEmpty(),
    check('type', 'El tipo es obligatorio').not().isEmpty(),
    //check('image', 'La imagen es obligatoria').not().isEmpty()
    validarCampos
], contentsPost );

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( contentExistsById ),
    validarCampos
], contentsPut);

module.exports = router;