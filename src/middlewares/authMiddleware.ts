import { Response } from 'express'
import { ApiError } from '../exceptions/ApiError'
import { tokenService } from '../services/tokenService'

export const authMiddleware = (req: Record<string, any>, res: Response, next: (e?: Error) => void) => {
  try {
    const { autorization } = req.headers
    if (!autorization) {
      return next(ApiError.UnautorizedError())
    }
    const token = autorization.split(' ')[1]
    if (!token) {
      return next(ApiError.UnautorizedError())
    }
    console.log('autorization', autorization)
    const userData = tokenService.validate(token, 'ACCESS')
    
    if (!userData) {
      return next(ApiError.UnautorizedError())
    }
    req.user = userData
    next()
  } catch (e) {
    return next(ApiError.UnautorizedError())
  }

}