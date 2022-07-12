import bcrypt from 'bcrypt'
// import { User } from '../types'
import { UserModel } from '../models/UserModel'
import { tokenService } from './tokenService'
import { UserDto } from '../dtos/UserDto'
import { ApiError } from '../exceptions/ApiError'
import { userService } from './userService'

export const authService = {
  registration: async (user: UserDto & { password: string }) => {
    const { email, password } = user
    
    const candidate = await UserModel.findOne({ email })
    if (candidate) {
      throw new ApiError(409, `Пользователь с email ${email} уже существует`)
    }
  
    const hashPassword = await bcrypt.hash(password, 3)
    const newUser = await UserModel.create({ ...user, password: hashPassword })

    const userDto = new UserDto(newUser)
    const tokens = tokenService.generate({ ...userDto })
    await tokenService.save(newUser._id, tokens.refreshToken)
     
    return { ...tokens, user: userDto }
  },
  login: async (user: UserDto & { password: string }) => {
    const { email, password } = user
    
    const foundUser = await UserModel.findOne({ email })
    if (!foundUser) {
      throw ApiError.BadRequest(`Пользователь с email ${email} не найден`)
    }
    
    const isPassEquals = await bcrypt.compare(password, foundUser.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest('Не корректный пароль')
    }

    const userDto = new UserDto(foundUser)
    const tokens = tokenService.generate({ ...userDto.getKey() })
    await tokenService.save(foundUser._id, tokens.refreshToken)
     
    return { ...tokens, user: userDto }
  }, 
  logout: async (refreshToken: string) => {
    if (!refreshToken) {
      throw ApiError.UnautorizedError()
    }
    await tokenService.remove(refreshToken)
  },
  refresh: async (refreshToken: string) => {
    if (!refreshToken) {
      throw ApiError.UnautorizedError()
    }
    const userData: any = tokenService.validate(refreshToken, 'REFRESH')
    const tokenFromDb = await tokenService.find(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiError.UnautorizedError()
    }

    const user = await userService.findById(String(userData._id))

    const tokens = tokenService.generate({ ...user.getKey() })
    await tokenService.save(userData._id, tokens.refreshToken)
     
    return { ...tokens, user }
  } 
}
