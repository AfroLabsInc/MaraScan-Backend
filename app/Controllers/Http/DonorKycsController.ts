import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DonorValidator from 'App/Validators/DonorValidator'
import DonorKyc from 'App/Models/DonorKyc'

export default class DonorKycsController {
  public async store({ request }: HttpContextContract) {
    const payload = await DonorValidator.submitKyc({ ...request.all() })

    const donorKyc = await DonorKyc.create({})

    return {
      status: 201,
      message: 'Donor KYC Submitted Successfully',
      data: donorKyc,
    }
  }
}
