import { Response } from 'express'
import { ApiError } from '../exceptions/ApiError'
import { tokenService } from '../services/tokenService'

export const authMiddleware = (req: Record<string, any>, res: Response, next: (e?: Error) => void) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      return next(ApiError.UnautorizedError())
    }
    const token = authorization.split(' ')[1]
    if (!token) {
      return next(ApiError.UnautorizedError())
    }
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