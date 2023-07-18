/* eslint-disable camelcase */
const { Schema, model } = require('mongoose')

const ContentSchema = Schema({
  title: {
    type: String,
    required: [true, 'El titulo es obligatorio'],
    unique: true
  },
  content: {
    type: String,
    required: [true, 'El desarrollo del contenido es obligatorio']
  },
  image: {
    type: String
  },
  link: {
    type: String,
    required: [true, 'El enlace al contenido es obligatoria'],
    unique: true
  },
  topic: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  approved: {
    type: Boolean,
    default: false
  },
  approved_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  author: {
    // Receive only the ID, it doesn´t include the complete author, it´s not neccesary
    type: Schema.Types.ObjectId,
    ref: 'User', // It refers to users collection
    required: [true, 'El autor es obligatorio']
  }
})

ContentSchema.methods.toJSON = function () {
  const { __v, ...content } = this.toObject()
  return content
}

module.exports = model('Contenido', ContentSchema)
