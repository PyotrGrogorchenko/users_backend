import { Router } from 'express'
import { body } from 'express-validator'
import { authMiddleware } from '../middlewares/authMiddleware'
import { controller } from '../controllers/userController'

const usersRouter = Router()

usersRouter.post('/registration', [
  body('password', 'Пароль должен быть длиннее 4 и короче 10 символов').isLength({ min: 4, max: 10 }),
  body('email', 'Email заполнен не коррктно').isEmail()
], controller.registration)
usersRouter.post('/login', [
  body('password', 'Пароль должен быть длиннее 4 и короче 10 символов').isLength({ min: 4, max: 10 }),
  body('email', 'Email заполнен не коррктно').isEmail()
], controller.login)
usersRouter.post('/logout', controller.logout)
usersRouter.get('/refresh', controller.refresh)
usersRouter.get('/', authMiddleware, controller.getUsers)
  
export { usersRouter }
