import { Router } from 'express'
import { controller } from '../controllers/authController'
import { getValidationMiddlware } from '../middlewares/validationMiddlware'

const authRouter = Router()

authRouter.post('/registration', getValidationMiddlware(['email', 'password', 'username']), controller.registration)
authRouter.post('/login', getValidationMiddlware(['email', 'password']), controller.login)
authRouter.post('/logout', controller.logout)
authRouter.get('/refresh', controller.refresh)
  
export { authRouter }
