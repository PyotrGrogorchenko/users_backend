import { Request, Response } from 'express'
import { ApiError } from '../exceptions/ApiError'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware = function (err: Error | ApiError, req: Request, res: Response, next: () => void) {
  console.error(err, typeof err, err instanceof ApiError)
  if ('isApiError' in err) {
    return res.status(err.status).json({ message: err.message, errors: err.errors })
  }
  return res.status(500).json({ message: 'Что-то пошло не так' })
}
