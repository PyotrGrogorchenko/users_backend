import { Request, Response } from 'express'
import { imageService } from '../services/imageService'

export const controller =  {
  upload: async (req: Request, res: Response, next: (e: Error) => void) => {
    try {
      const imageData = await imageService.upload(req)
      return res.status(imageData.status).json(imageData.image)
    } catch (e: any) {
      next(e)
    }
  },
  download: async (req: Request, res: Response, next: (e: Error) => void) => {
    try {
      const { userId, type = 'avatar' } = req.query
      const image = await imageService.download(String(userId), String(type))
      return res.status(200).json({ image })
    } catch (e: any) {
      next(e)
    }
  }
}
