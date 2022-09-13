import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Donation from 'App/Models/Donation'

export default class DonationsController {
  public async index({}: HttpContextContract) {
    const donations = await Donation.query().preload('donationRequest').preload('donor')

    return {
      status: 200,
      message: 'All Donations Fetched Successfully',
      data: donations,
    }
  }

  public async show({ params }: HttpContextContract) {
    const donationId: number = params.id

    const donation = await Donation.query()
      .where('id', donationId)
      .preload('donationRequest')
      .preload('donor')
      .firstOrFail()

    return {
      status: 200,
      message: 'Donation Details Fetched Successfully',
      data: donation,
    }
  }
}
