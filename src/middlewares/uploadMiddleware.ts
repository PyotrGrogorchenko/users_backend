import multer, { diskStorage } from 'multer'

// const storage = diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, String(process.env.TEMP_DIR_PATH))
//   },
//   filename: (req, file, cb) => {
//     console.log('filename', file)
//     cb(null, file.originalname)
//   }
// })

const storage = multer.memoryStorage()
export const uploadMiddleware = multer({ storage: storage })




// export const avatarMiddlware = uploadMiddleware.fields([{ name: 'avatar', maxCount: 1 }])

