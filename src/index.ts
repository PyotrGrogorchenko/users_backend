import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'
import { mkdirSync, existsSync } from 'fs'
import { usersRouter } from './routers/user'
import { imagesRouter } from './routers/image'
import { errorMiddleware } from './middlewares/errorMiddleware'

export const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))
app.get('/', (_, res) => {res.send('<h1>Welcome!</h1>')})

app.use('/api/users', usersRouter)
app.use('/api/images', imagesRouter)

app.use(errorMiddleware)

const makeTempDir = () => {
  process.env.TEMP_DIR_PATH = path.join(__dirname, '..', '/temp')
  if (!(existsSync(process.env.TEMP_DIR_PATH))) {
    mkdirSync(process.env.TEMP_DIR_PATH)
  }  
}

const start = async () => {
  try {
    makeTempDir()
    await mongoose.connect(String(process.env.MONGO_CONNECTION_STRING))
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))
  } catch (e) {
    console.log(e)
  }  
}

start()
