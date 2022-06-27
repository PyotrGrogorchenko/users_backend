import multer, { diskStorage } from 'multer'

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, String(process.env.TEMP_DIR_PATH))
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

export const uploadMiddleware = multer({ storage: storage })
