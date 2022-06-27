import { Schema, model } from 'mongoose'
import { User } from '../types'

const UserSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: false },
  password: { type: String, required: true },
  dateBirth: { type: String, required: false },
  gender: { type: String, required: false },
  avatar: { type: String, required: false }
})

export const UserModel = model('User', UserSchema)
