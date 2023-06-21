const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const Usuario = require('../models/usuario');
const ValidarCampos = require('../middlewares/validate-fields');



const usuariosGet = (req = request, res = response) => { //la ruta se está estableciendo en server, al llamar
    
    const {q, nombre = 'Not name', apikey, page=1, limit} = req.query;
    
    res.json({
        msg: 'get API - controlador', //especifica solo los argumentos que quiere tomar
        q,
        nombre, 
        apikey, 
        page,
        limit
    });
}

async function usuariosPost(req, res = response) {

    const {name, last_name, email, password, role, occupation, about_user, img, status} = req.body;
    const usuario = new Usuario({name, last_name, email, password, role, occupation, about_user, img, status});

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    //Guardar en la base de Datos
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async (req, res = response) => {
    
    const { id } = req.params;
    const { _id, password, email, ...resto } = req.body;

    // TO DO validar contra la base de datos
    if(password){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );

    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto )

    res.json({
        msg: 'put API - usuariosPut',
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador '
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}