import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { TokenModel } from '../models/TokenModel'

export const tokenService = {
  generate: (payload: object) => {
    const accessToken = jwt.sign(payload, String(process.env.JWT_ACCESS_SECRET), { expiresIn: '15m' })
    const refreshToken = jwt.sign(payload, String(process.env.JWT_REFRESH_SECRET), { expiresIn: '30d' })
    return { accessToken, refreshToken }    
  },
  save: async (userId: Types.ObjectId, refreshToken: string) => {
    const tokenData = await TokenModel.findOne({ user: userId } )
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await TokenModel.create({ user: userId, refreshToken })
    return token
  },
  remove: async (refreshToken: string) => {
    await TokenModel.deleteOne({ refreshToken })
  },
  validate: (token: string, type: 'ACCESS' | 'REFRESH') => {
    try {
      return jwt.verify(token, String(process.env[`JWT_${type}_SECRET`]))
    } catch (e) {
      return null
    }  
  },
  find: async (refreshToken: string) => {
    const tokenData = await TokenModel.findOne({ refreshToken })
    return tokenData
  }
}
