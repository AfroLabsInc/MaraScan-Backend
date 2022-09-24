import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conservancy from 'App/Models/Conservancy'
import ConservancyValidator from 'App/Validators/ConservancyValidator'

export default class ConservancyAuthsController {
  public async login({ request, auth }: HttpContextContract) {
    const payload = await ConservancyValidator.login({ ...request.all() })

    const token = await auth.use('conservancyApi').attempt(payload.email, payload.password, {
      expiresIn: '2 days',
    })

    const conservancy = await Conservancy.query()
      .where('id', token.user.id)
      .preload('coverImage')
      .preload('categories', (category) => {
        category.preload('coverImage').preload('beneficiaries')
      })

    return {
      status: 200,
      message: 'Conservancy Login was successful',
      data: {
        token: token.token,
        donor: conservancy,
      },
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.logout()
    return { status: 200, message: 'Logout was successful' }
  }
}
