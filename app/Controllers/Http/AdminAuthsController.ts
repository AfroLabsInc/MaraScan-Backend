import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AdminValidator from 'App/Validators/AdminValidator'

export default class AdminAuthsController {
  public async login({ request, auth }: HttpContextContract) {
    const payload = await AdminValidator.login({ ...request.all() })

    const token = await auth.use('adminApi').attempt(payload.email, payload.password, {
      expiresIn: '2 days',
    })

    return {
      status: true,
      message: 'Admin Login was successful',
      data: {
        token: token.token,
        beneficiary: token.user,
      },
    }
  }
}
