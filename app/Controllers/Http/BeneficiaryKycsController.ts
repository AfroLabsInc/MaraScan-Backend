import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BeneficiaryKyc from 'App/Models/BeneficiaryKyc'
import BeneficiaryValidator from 'App/Validators/BeneficiaryValidator'

export default class BeneficiaryKycsController {
  public async store({ request, params }: HttpContextContract) {
    const beneficiaryId: number = params.beneficiary_id

    const payload = await BeneficiaryValidator.submitKyc({ ...request.all() })

    await BeneficiaryKyc.create({ ...payload, beneficiaryId })

    return {
      status: 201,
      message: 'Beneficiary KYC Submitted Successfully',
    }
  }
}
