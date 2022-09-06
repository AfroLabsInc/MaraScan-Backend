import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Beneficiary from 'App/Models/Beneficiary'
import BeneficiaryValidator from 'App/Validators/BeneficiaryValidator'

export default class BeneficiariesController {
  public async index({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const payload = await BeneficiaryValidator.store({ ...request.all() })

    const beneficiary = await Beneficiary.create(payload)

    return {
      status: 201,
      message: 'Beneficiary Created Successfully',
      data: beneficiary,
    }
  }

  public async show({ params }: HttpContextContract) {
    const beneficiaryId: number = params.beneficiary_id

    const beneficiary = await Beneficiary.query().where('id', beneficiaryId).firstOrFail()

    return {
      status: 200,
      message: 'Beneficiary Details Fetched Successfully',
      data: beneficiary,
    }
  }

  public async showByAddress({ params }: HttpContextContract) {
    const accountAddress: string = params.account_address

    const beneficiary = await Beneficiary.query().where('accountAddress', accountAddress).first()

    return {
      status: 200,
      message: 'Beneficiary Details Fetched Successfully',
      data: beneficiary,
    }
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
