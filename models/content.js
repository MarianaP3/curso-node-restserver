
const { Schema, model } = require('mongoose');

const ContentSchema = Schema({
    title: {
        type: String,
        required: [true, "El titulo es obligatorio"],
        unique: true
    },
    content: {
        type: String,
        required: [true, "El desarrollo del contenido es obligatorio"]
    },
    image: {
        type: String
    },
    link: {
        type: String,
        required: [true, "El enlace al contenido es obligatoria"], 
        unique: true
    },
    topic: {
        type: String,
        required: true,
        emun: ['SAVING', "INVERSION", "CREDIT", "FINANCIAL_LIFE"]
    },
    type: {
        type: String,
        required: true,
        emun: ['ARTICLE', "PODCAST", "CAPSULE"]
    },
    status: {
        type: Boolean,
        required: [true, "El estado es obligatorio"]
    },
    /*Approved by: String (not required if status is false)*/
    approved_by: {
        type: String
    },
    author: {
        type: String,
        required: [true, "El autor es obligatorio"]
    }
});

ContentSchema.methods.toJSON = function() {
    const { __v } = this.toObject();
    return content;
}

module.exports = model( 'Contenido', ContentSchema );