const { Schema, model } = require('mongoose')

const TypeSchema = Schema({
  type: {
    type: String,
    required: [true, 'El tipo es obligatorio'],
    enum: ['ARTICLE', 'PODCAST', 'CAPSULE']
  }
})

module.exports = model('Type', TypeSchema)
// solo se podrá acceder a el como 'Type'
