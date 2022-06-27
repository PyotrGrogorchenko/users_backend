import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import { userService } from '../services/userService'
import { ApiError } from '../exceptions/ApiError'

export const controller =  {
  registration: async (req: Request, res: Response, next: (e: Error) => void) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array())) 
      }
      const userData = await userService.registration(req.body)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 100, httpOnly: true })
      return res.status(201).json(userData)
    
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
      const userData = await userService.login(req.body)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 100, httpOnly: true })
      return res.status(200).json(userData)
    } catch (e: any) {
      next(e)
    }
  },
  logout: async (req: Request, res: Response, next: (e: Error) => void) => {
    try {
      const { refreshToken } = req.cookies
      await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      console.log('logout')
      return res.status(200)
    } catch (e: any) {
      next(e)
    }
  },
  refresh: async (req: Request, res: Response, next: (e: Error) => void) => {
    try {
      const { refreshToken } = req.cookies
      const userData = await userService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 100, httpOnly: true })
      return res.status(200).json(userData)
    } catch (e: any) {
      next(e)
    }
  }, 
  getUsers: async (req: Request, res: Response, next: (e: Error) => void) => {
    try {
      const users = await userService.find()
      return res.status(200).json(users)
    } catch (e: any) {
      next(e)
    }
  }
}
