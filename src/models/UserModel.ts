import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: false },
  password: { type: String, required: true },
  dateBirth: { type: Date, required: false },
  gender: { type: String, enum : ['male', 'female'], required: false },
  avatar: { type: String, required: false }
})

// UserSchema.virtual('id').get(function () {return this._id})

export const UserModel = model('User', UserSchema)
