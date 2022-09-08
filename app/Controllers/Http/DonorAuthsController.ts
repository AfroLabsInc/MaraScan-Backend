import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Donor from 'App/Models/Donor'
import DonorValidator from 'App/Validators/DonorValidator'

export default class DonorAuthsController {
  public async login({ request, auth }: HttpContextContract) {
    const payload = await DonorValidator.login({ ...request.all() })

    const token = await auth.use('donorApi').attempt(payload.email, payload.password, {
      expiresIn: '2 days',
    })

    return {
      status: 200,
      message: 'Donor Login was successful',
      data: {
        token: token.token,
        donor: token.user,
      },
    }
  }

  public async register({ request, auth }: HttpContextContract) {
    const payload = await DonorValidator.store({ ...request.all() })

    const donor = await Donor.create({
      ...payload,
    })

    const token = await auth.use('donorApi').attempt(payload.email, payload.password, {
      expiresIn: '2 days',
    })

    return {
      status: 201,
      message: 'Donor Created and Logged in successfully',
      data: {
        token: token.token,
        donor: donor,
      },
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.logout()
    return { status: 200, message: 'Logout was successful' }
  }
}
