import { Request, Response } from 'express'
import { imageService } from '../services/imageService'

export const controller =  {
  upload: async (req: Request & { user?: Record<string, string> }, res: Response, next: (e: Error) => void) => {
    try {
      const userId = (req.user as Record<string, string>)._id
      const imageData = await imageService.upload(userId, req.file, req.body.type)
      return res.status(imageData.status).json(imageData.image)
    } catch (e: any) {
      next(e)
    }
  },
  download: async (req: Request & { user?: Record<string, string> }, res: Response, next: (e: Error) => void) => {
    try {
      console.log('download', req.user)
      const userId = (req.user as Record<string, string>)._id
      // const { userId, type = 'avatar' } = req.query
      const image = await imageService.download(userId, String(type))
      // return res.status(200).json(image)
      return res.status(200).json({ ok: true })
    } catch (e: any) {
      next(e)
    }
  }
}
