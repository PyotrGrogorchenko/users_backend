import { ApiError } from '../exceptions/ApiError'
import { Request, Response } from 'express'
import { imageService } from '../services/imageService'

export const controller =  {
  upload: async (req: Request & { user?: Record<string, string> }, res: Response, next: (e: Error) => void) => {
    try {
      const userId = (req.user as Record<string, string>)._id
      const imageData = await imageService.upload(userId, req.file, req.body.type)
      return res.status(imageData.status).json({ ok: true, ...imageData.data })
    } catch (e: any) {
      next(e)
    }
  },
  download: async (req: Request, res: Response, next: (e: Error) => void) => {
    try {
      const { imageId } = req.query 
      if (!imageId) {
        throw new ApiError(400, 'Не указан параметр запроса imageId')  
      }     
      
      const imageData = await imageService.download(imageId as string)
      return res.status(200).json({ ok: true, ...imageData.data })
    } catch (e: any) {
      next(e)
    }
  }
}
