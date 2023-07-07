/* eslint-disable camelcase */
const { Schema, model } = require('mongoose')
// const validateType = require('../models/type')
// const validateTopic = require('../models/topic')
// const UserId = require('../models/user')

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
  /* Approved by: String (not required if isn't approved) */
  approved_by: {
    type: String // UserId
  },
  author: {
    type: String,
    required: [true, 'El autor es obligatorio']
  }
})

ContentSchema.methods.toJSON = function () {
  // const { __v } = this.toObject()
  const { __v, ...content } = this.toObject()
  return content
}

module.exports = model('Contenido', ContentSchema)
