import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Beneficiary from 'App/Models/Beneficiary'
import DonationRequest from 'App/Models/DonationRequest'

export default class DonationsController {
  public async index({}: HttpContextContract) {
    const donations = await DonationRequest.query()
      .where('paymentStatus', 'paid')
      .preload('donor')
      .preload('conservancy')
      .orderBy('createdAt', 'desc')

    return {
      status: 200,
      message: 'Successfully Fetched all Donations',
      data: donations,
    }
  }

  public async show({ params }: HttpContextContract) {
    const donationRequestId: number = params.id

    const donation = await DonationRequest.query()
      .where('id', donationRequestId)
      .preload('donor')
      .preload('conservancy')
      .firstOrFail()
    const beneficiaries = await Beneficiary.query().where(
      'categoryId',
      Number(donation.categoryIds[0])
    )
    return {
      status: 200,
      message: 'Donation Details Fetched Successfully',
      data: { donation, beneficiaries },
    }
  }
}
