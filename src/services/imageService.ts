import { ImageModel } from '../models/ImageModel'
import { ApiError } from '../exceptions/ApiError'
import { UserModel } from '../models/UserModel'

export const imageService = {
  upload: async (userId: string, file?: Express.Multer.File, type = 'avatar') => {
    
    const foundUser = await UserModel.findById(userId)

    if (!foundUser) throw new ApiError(400, 'Не удалось сохранить изображение')

    const imageObj = {
      type,
      image: {
        data: file?.buffer,
        contentType: file?.mimetype
      }
    }

    if (foundUser.avatar) {
      const image = await ImageModel.findByIdAndUpdate(foundUser.avatar, imageObj)
      return { status: 200, ok: true, image: { ...image } }
    }

    const newImage = await ImageModel.create(imageObj)
    await UserModel.findByIdAndUpdate(userId, { avatar: newImage._id })

    return { status: 201, ok: true, image: { ...newImage } }
  }, 
  download: async (userId: string, type: string = 'avatar') => {
    const image = await ImageModel.findOne({ userId, type })
    if (image) {
      return { image: image.image }
    }
    
    throw new ApiError(400, 'Изображение не найдено')
  } 
}
