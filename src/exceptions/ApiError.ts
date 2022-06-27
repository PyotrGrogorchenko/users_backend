export class ApiError extends Error {
  status
  errors
  isApiError = true

  constructor(status: number, message: string, errors: unknown = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static UnautorizedError() {
    return new ApiError(401, 'Пользователь не авторизован')
  }

  static BadRequest(message: string, errors: unknown = []) {
    return new ApiError(404, message, errors)
  }
}
