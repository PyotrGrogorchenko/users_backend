import { Schema, model } from 'mongoose'
  
export const ImageSchema = new Schema({
  type: { type: String, require: true },
  image: {
    data: Buffer,
    contentType: String
  }
})

export const ImageModel = model('Image', ImageSchema)
