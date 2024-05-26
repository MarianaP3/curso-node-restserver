const { Schema, model } = require('mongoose')
const { TYPES } = require('../constants')

const TypeSchema = Schema({
  type: {
    type: String,
    required: [true, 'El tipo es obligatorio'],
    enum: Object.values(TYPES)
  }
})

module.exports = model('Type', TypeSchema)
