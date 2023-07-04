 const Role = require('../models/role');
 const Usuario = require('../models/user');

const isRoleValid = async (role = '' )=> {
    const existeRol = await Role.findOne({ role });
    if( !existeRol ){
            throw new Error('El rol '+ role  +' no es valido')
    }
}

const isEmailValid = async (email = '')=> {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ email: email });
    if ( existeEmail ) {
        throw new Error('El correo ' + email + ' ya está registrado');
    }
}

const userExistsById = async ( id )=> {
    //Verificar si el correo existe
    const existeUsuario = await Usuario.findById( id );
    if ( !existeUsuario ) {
        throw new Error('El usuario de id: ' + id + ' no existe');
    }
}

const contentExistsById = async ( id )=> {
    //Verificar si el correo existe
    const existeContenido = await Contenido.findById( id );
    if ( !existeContenido ) {
        throw new Error('El contenido de id: ' + id + ' no existe');
    }
}

//const titleExistsById = async ()

module.exports = { //exporta un objeto
    isEmailValid,
    isRoleValid,
    userExistsById,
    contentExistsById
}