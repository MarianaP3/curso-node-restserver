import { Schema, model } from 'mongoose'
import { ROLES } from '../constants'
/*
const { Schema, model } = require('mongoose')
const { ROLES } = require('../constants')
*/

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, 'El rol es obligatorio'],
    enum: Object.values(ROLES)
  }
})

export default model('Role', RoleSchema)
// solo se podrá acceder a el como 'Role'
