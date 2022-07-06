import { UserDto } from '../dtos/userDto'
import { UserModel } from '../models/UserModel'

export const userService = {
  find: async () => {
    const users = await UserModel.find({}, { password: false })
    return users
  }, 
  updateOne: async (id: string, data: UserDto ) => {
    await UserModel.findOneAndUpdate({ _id: id }, { ...data })
  },
  findById: async (id: string) => {
    const user = await UserModel.findById(id)
    return new UserDto(user)
  }
}
