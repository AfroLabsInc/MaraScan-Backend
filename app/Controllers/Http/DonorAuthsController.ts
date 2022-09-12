import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Donor from 'App/Models/Donor'
import DonorValidator from 'App/Validators/DonorValidator'
import randomDigits from 'randomatic'
import { decryptText } from 'App/Utils'

export default class DonorAuthsController {
  public async login({ request, auth }: HttpContextContract) {
    const payload = await DonorValidator.login({ ...request.all() })

    const token = await auth.use('donorApi').attempt(payload.email, payload.password, {
      expiresIn: '2 days',
    })

    const donor = await Donor.query()
      .where('id', token.user.id)
      .preload('kyc')
      .preload('individualProfile')
      .preload('organizationProfile')
      .firstOrFail()

    return {
      status: 200,
      message: 'Donor Login was successful',
      data: {
        token: token.token,
        donor: donor,
      },
    }
  }

  public async register({ request, auth }: HttpContextContract) {
    const payload = await DonorValidator.store({ ...request.all() })

    let donor = await Donor.create({
      ...payload,
    })

    const token = await auth.use('donorApi').attempt(payload.email, payload.password, {
      expiresIn: '2 days',
    })

    donor = await Donor.query()
      .where('id', donor.id)
      .preload('kyc')
      .preload('individualProfile')
      .preload('organizationProfile')
      .firstOrFail()

    return {
      status: 201,
      message: 'Donor Created and Logged in successfully',
      data: {
        token: token.token,
        donor: donor,
      },
    }
  }

  public async walletAuth({ request, auth }: HttpContextContract) {
    const payload = await DonorValidator.walletAuth({ ...request.all() })

    let donor = await Donor.findBy('accountAddress', payload.accountAddress)

    if (!donor) {
      const password = randomDigits('A0', 8)
      donor = await Donor.create({
        ...payload,
        password,
      })
    }

    const token = await auth
      .use('donorApi')
      .attempt(payload.accountAddress, decryptText(donor.encryptedPassword), {
        expiresIn: '2 days',
      })

    donor = await Donor.query()
      .where('accountAddress', payload.accountAddress)
      .preload('kyc')
      .preload('individualProfile')
      .preload('organizationProfile')
      .firstOrFail()

    return {
      status: 201,
      message: 'Donor Authenticated successfully',
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
