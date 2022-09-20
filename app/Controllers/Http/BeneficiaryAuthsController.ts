import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Beneficiary from 'App/Models/Beneficiary'
import BeneficiaryEthereumAccountService from 'App/Services/BeneficiaryEthereumAccountService'
import BeneficiaryValidator from 'App/Validators/BeneficiaryValidator'

export default class BeneficiaryAuthsController {
  public async login({ request, auth }: HttpContextContract) {
    const payload = await BeneficiaryValidator.login({ ...request.all() })

    const token = await auth.use('beneficiaryApi').attempt(payload.mobile, payload.password, {
      expiresIn: '2 days',
    })

    return {
      status: 200,
      message: 'Beneficiary Login was successful',
      data: {
        token: token.token,
        beneficiary: token.user,
      },
    }
  }

  public async register({ request, auth }: HttpContextContract) {
    const payload = await BeneficiaryValidator.store({ ...request.all() })

    const account = await BeneficiaryEthereumAccountService.createBeneficiaryAccount()

    const beneficiary = await Beneficiary.create({
      ...payload,
      ethereumAccountAddress: account.address,
      ethereumAccountPrivateKey: account.privateKey,
    })

    const token = await auth.use('beneficiaryApi').attempt(payload.mobile, payload.password, {
      expiresIn: '2 days',
    })

    return {
      status: 201,
      message: 'Beneficiary Created and Logged in successfully',
      data: {
        token: token.token,
        beneficiary: beneficiary,
      },
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.logout()
    return { status: 200, message: 'Logout was successful' }
  }
}
