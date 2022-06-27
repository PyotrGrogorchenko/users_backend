import { Schema, model } from 'mongoose'

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, unique: true, ref: 'User' },
  refreshToken: { type: String, required: true }
})

export const TokenModel = model('Token', TokenSchema)
