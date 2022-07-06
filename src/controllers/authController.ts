import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import { ApiError } from '../exceptions/ApiError'
import { authService } from '../services/authService'

export const controller =  {
  registration: async (req: Request, res: Response, next: (e: Error) => void) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array())) 
      }
      const userData = await authService.registration(req.body)
      
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 100, httpOnly: true })
      return res.status(201).json({ ...userData, ok: true })
    
    } catch (e: any) {
      next(e)
    }
  },
  login: async (req: Request, res: Response, next: (e: Error) => void) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array())) 
      }
      const userData = await authService.login(req.body)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 100, httpOnly: true })
      return res.status(200).json({ ...userData, ok: true })
    } catch (e: any) {
      next(e)
    }
  },
  logout: async (req: Request, res: Response, next: (e: Error) => void) => {
    try {
      const { refreshToken } = req.cookies
      await authService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.status(200).json({ message: 'ok', ok: true })
    } catch (e: any) {
      next(e)
    }
  },
  refresh: async (req: Request, res: Response, next: (e: Error) => void) => {
    try {
      const { refreshToken } = req.cookies
      const userData = await authService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 100, httpOnly: true })
      return res.status(200).json({ ...userData, ok: true })
    } catch (e: any) {
      next(e)
    }
  }
}
