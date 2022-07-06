import { uploadMiddleware } from '../middlewares/uploadMiddleware'
import { Router } from 'express'
import { ImageModel } from '../models/ImageModel'

const testRouter = Router()

testRouter.post('/multer', uploadMiddleware.single('avatar'), async (req: any, res: any) => {
  // console.log('test/multer file:', req.file)
  // console.log('test/multer body:', req.body)
  
  const imageObj = {
    image: {
      data: req.file.buffer,
      contentType: req.file?.mimetype
    }
  }

  // unlinkSync(imagePath)

  // const image = await ImageModel.findOne({ user: userId, type: imageObj.type })
  // if (image) {
  //   image.updateOne(imageObj)  
  //   return { status: 202, image: image.image }
  // }
  
  const newImage = await ImageModel.create(imageObj)

  return res.status(200).json({ ok: true, ava: newImage })
})
  
export { testRouter }
