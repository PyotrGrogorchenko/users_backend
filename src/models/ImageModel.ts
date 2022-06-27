import { Schema, model } from 'mongoose'
  
const ImageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  type: { type: String, require: true },
  image: {
    data: Buffer,
    contentType: String
  }
})

export const ImageModel = model('Image', ImageSchema)
