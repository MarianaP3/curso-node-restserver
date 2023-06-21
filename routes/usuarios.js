
const { Router } = require('express');
// CommonJS
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validate-fields');

// ES Modules
//import {check } from "express-validator"

const { usuariosGet, 
        usuariosPost, 
        usuariosPatch, 
        usuariosDelete, 
        usuariosPut } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
        //middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('last_name', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El correo no es válido').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('password', 'La contraseña debe tener al menos 8 caracteres').isLength( { min: 8 } ),
        check('role','No es un rol válido').isIn(['AUTHOR_ROLE', 'EDITOR_ROLE']),
        check('occupation', 'La ocupación es obligatoria').not().isEmpty(),
        check('about_user', 'La información sobre ti es obligatoria').not().isEmpty(),
        check('img', 'La fotografía es obligatoria').not().isEmpty(),
        validarCampos
], usuariosPost );

router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);

module.exports = router;
