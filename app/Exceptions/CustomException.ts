import { Exception } from '@poppinss/utils'

export default class CustomException extends Exception {
  constructor(message: string, status: number, code: string = 'CUSTOM_ERROR_CODE') {
    super(message, status, code)
  }
}
