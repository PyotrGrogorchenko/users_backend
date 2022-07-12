import { ImageModel } from '../models/ImageModel'
import { ApiError } from '../exceptions/ApiError'
import { UserModel } from '../models/UserModel'
import { ImageDto } from '../dtos/ImageDto'

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
      const foundImage = await ImageModel.findByIdAndUpdate(foundUser.avatar, imageObj)
      return { status: 200, data: new ImageDto(foundImage) }
    }

    const newImage = await ImageModel.create(imageObj)
    await UserModel.findByIdAndUpdate(userId, { avatar: newImage._id })
    return { status: 201, data: new ImageDto(newImage) }
  }, 
  download: async (imageId: string) => {
    const image = await ImageModel.findById(imageId)
    if (image) {
      return { data: new ImageDto(image) }
    }
    
    throw new ApiError(400, 'Изображение не найдено')
  } 
}
