import { readFileSync, unlinkSync } from 'fs'
import path from 'path'
import { Request } from 'express'
import { ImageModel } from '../models/ImageModel'
import { ApiError } from '../exceptions/ApiError'

export const imageService = {
  upload: async (req: Request) => {
    const imagePath = path.join(String(process.env.TEMP_DIR_PATH) + '/' + req.file?.originalname)
    const imageObj = {
      user: req.body.userId,
      type: req.body.type || 'avatar',
      image: {
        data: readFileSync(imagePath),
        contentType: req.file?.mimetype
      }
    }

    unlinkSync(imagePath)

    const image = await ImageModel.findOne({ user: req.body.userId, type: imageObj.type })
    if (image) {
      image.updateOne(imageObj)  
      return { status: 202, image: image.image }
    }
    
    const newImage = await ImageModel.create(imageObj)

    return { status: 201, image: newImage.image }
  }, 
  download: async (userId: string, type: string) => {
    const image = await ImageModel.findOne({ userId, type })
    if (image) {
      return { image: image.image }
    }
    
    throw new ApiError(400, 'Изображение не найдено')
  } 
}
