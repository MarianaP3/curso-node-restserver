const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();
}

const isValueNotANumber = (value) => {
  return isNaN(value) || value < 0
}

const validarSince = (req, res, next) => {
    const {since} = req.query

    if (!since) {
      next()
      return
    }
    
    if (isValueNotANumber(since)) {
      return res.status(400).json({ error: 'El valor de since debe ser un número entero positivo' });
    }
  
    next();
};
  
const validarLimit = (req, res, next) => {
    const {limit} = req.query; 

    if (!limit) return next()

    if (isValueNotANumber(limit)) {
      return res.status(400).json({ error: 'El valor de limit debe ser un número entero positivo.' });
    }
  
    next();
  }

module.exports = {
    validarCampos,   
    validarLimit,
    validarSince
    
}