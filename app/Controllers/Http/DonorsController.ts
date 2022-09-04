import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Donor from 'App/Models/Donor'
import DonorValidator from 'App/Validators/DonorValidator'

export default class DonorsController {
  public async index({}: HttpContextContract) {
    const donors = await Donor.query()
      .preload('kyc', (query) => {
        query.preload('idCard')
        query.preload('photo')
      })
      .preload('individualProfile')
      .preload('organizationProfile')

    return {
      status: 200,
      message: 'All Donors Fetched Successfully',
      data: donors,
    }
  }

  public async store({ request }: HttpContextContract) {
    const payload = await DonorValidator.store({ ...request.all() })

    const donor = await Donor.create(payload)

    return {
      status: 201,
      message: 'Donor Created Successfully',
      data: donor,
    }
  }

  public async show({ params }: HttpContextContract) {
    const donorId: number = params.donorId

    const donor = await Donor.query()
      .where('id', donorId)
      .preload('kyc', (query) => {
        query.preload('idCard')
        query.preload('photo')
      })
      .preload('individualProfile')
      .preload('organizationProfile')
      .firstOrFail()

    return {
      status: 200,
      message: 'Donor Details Fetched Successfully',
      data: donor,
    }
  }

  public async showByAddress({ params }: HttpContextContract) {
    const accountAddress: string = params.account_address

    const donor = await Donor.query()
      .where('accountAddress', accountAddress)
      .preload('kyc', (query) => {
        query.preload('idCard')
        query.preload('photo')
      })
      .preload('individualProfile')
      .preload('organizationProfile')
      .first()

    return {
      status: 200,
      message: 'Donor Details Fetched Successfully',
      data: donor,
    }
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
