import { Schema, model } from 'mongoose'
import { ROLES } from '../constants'

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, 'El rol es obligatorio'],
    enum: Object.values(ROLES)
  }
})

export default model('Role', RoleSchema)

