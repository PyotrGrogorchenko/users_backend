import { Request, Response } from 'express'

import { userService } from '../services/userService'

export const controller =  {
  getUsers: async (req: Request, res: Response, next: (e: Error) => void) => {
    try {
      const users = await userService.find()
      return res.status(200).json(users)
    } catch (e: any) {
      next(e)
    }
  },
  putUser: async (req: Request & { user?: Record<string, string> }, res: Response, next: (e: Error) => void) => {
    try {
      const id = (req.user as Record<string, string>)._id
      await userService.updateOne(id, req.body)
      return res.status(200).json({ ok: true })
    } catch (e: any) {
      next(e)
    }
  }
}
