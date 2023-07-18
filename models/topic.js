const { Schema, model } = require('mongoose')
const { TOPICS } = require('../constants')

const TopicSchema = Schema({
  topic: {
    type: String,
    required: [true, 'El tema es obligatorio'],
    enum: Object.values(TOPICS)
  }
})

module.exports = model('Topic', TopicSchema)
