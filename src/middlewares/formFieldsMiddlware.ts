import { Response } from 'express'
import { ApiError } from '../exceptions/ApiError'

export const formFieldsMiddleware = (req: Record<string, any>, res: Response, next: (e?: Error) => void) => {
  try {
    if (req.body.formFields) {
      const formFields = JSON.parse(req.body.formFields)
      req.body = {
        ...req.body,
        ...formFields
      }
      delete req.body.formFields
    }
    next()
  } catch (e) {
    return next(ApiError.BadRequest('Что-то пошло не так'))
  }

}