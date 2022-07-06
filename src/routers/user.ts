import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware'
import { controller } from '../controllers/userController'

const usersRouter = Router()
usersRouter.get('/', authMiddleware, controller.getUsers)
usersRouter.put('/', authMiddleware, controller.putUser)
  
export { usersRouter }
