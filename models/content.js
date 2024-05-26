/* eslint-disable camelcase */
const { Schema, model } = require('mongoose')
const { TOPICS } = require('../constants')

const ContentSchema = Schema({
  content_id: {
    type: Number,
    required: [true]
  },
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
    unique: true
  },
  topic_id: {
    type: String,
    enum: Object.values(TOPICS),
    required: true
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
