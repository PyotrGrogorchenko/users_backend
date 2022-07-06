import { Router } from 'express'
import { controller } from '../controllers/imageController'
import { uploadMiddleware } from '../middlewares/uploadMiddleware'
import { authMiddleware } from '../middlewares/authMiddleware'

const imagesRouter = Router()
imagesRouter.post('', authMiddleware, uploadMiddleware.single('image'), controller.upload)
imagesRouter.get('', authMiddleware, controller.download)
  
export { imagesRouter }
