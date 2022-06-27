import { Router } from 'express'
import { controller } from '../controllers/imageController'
import { uploadMiddleware } from '../middlewares/uploadMiddleware'

const imagesRouter = Router()
imagesRouter.post('', uploadMiddleware.single('image'), controller.upload)
imagesRouter.get('', controller.download)
  
export { imagesRouter }
