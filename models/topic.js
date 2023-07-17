const { Schema, model } = require('mongoose')

const TopicSchema = Schema({
  topic: {
    type: String,
    required: [true, 'El tema es obligatorio'],
    enum: ['Saving', 'Inversion', 'Credit', 'FinancialLife']
  }
})

module.exports = model('Topic', TopicSchema)
