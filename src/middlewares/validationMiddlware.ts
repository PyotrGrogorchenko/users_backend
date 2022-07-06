import { body, ValidationChain } from 'express-validator'

const values = {
  password: body('password', 'Пароль должен быть длиннее 4 и короче 10 символов').isLength({ min: 4, max: 10 }),
  email: body('email', 'Email заполнен не коррктно').isEmail(),
  username: body('username', 'Имя пользователя должен быть длиннее 4 и короче 10 символов').isLength({ min: 4, max: 10 })
}

type Keys = keyof typeof values

export const getValidationMiddlware = (keys: Keys[] ) => 
  keys.reduce((r, c) => {
    r.push(values[c])
    return r
  }, <ValidationChain[]>[])
