const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();
}
/*
const validarSince = (req, res, next) => {
    const since = (req.query.since);
    if (isNaN(since) && !since > 0) {
      return res.status(400).json({ error: 'El valor de since debe ser un número entero positivo' });
    }
  
    next();
};
  
const validarLimit = (req, res, next) => {
    const limit = (req.query.limit); 
    if (isNaN (limit) && !limit > 0) {
      return res.status(400).json({ error: 'El valor de limit debe ser un número entero positivo.' });
    }
  
    next();
  }
*/
module.exports = {
    validarCampos,
    /*
    validarLimit,
    validarSince
    */
}