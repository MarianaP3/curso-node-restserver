const { Schema, model } = require('mongoose')

const TopicSchema = Schema({
  topic: {
    type: String,
    required: [true, 'El tema es obligatorio']
  }
})

module.exports = model('Topic', TopicSchema)
