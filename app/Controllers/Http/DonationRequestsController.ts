import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DonationRequest from 'App/Models/DonationRequest'
import DonationRequestValidator from 'App/Validators/DonationRequestValidator'

export default class DonationRequestsController {
  public async index({ params }: HttpContextContract) {
    const donorId: number = params.donor_id

    const donationRequests = await DonationRequest.query().where('donorId', donorId)

    return {
      status: 200,
      message: 'Donation Requests Fetched Successfully',
      data: donationRequests,
    }
  }

  public async store({ request, auth }: HttpContextContract) {
    const donorId: number = auth.user!.id

    const payload = await DonationRequestValidator.store({ ...request.all() })

    const donationRequest = await DonationRequest.create({ ...payload, donorId })

    return {
      status: 201,
      message: 'Donation Request Created Successfully',
      data: donationRequest,
    }
  }

  public async show({ params }: HttpContextContract) {
    const donoationRequestId: number = params.id

    const donationRequest = await DonationRequest.query()
      .where('id', donoationRequestId)
      .firstOrFail()

    return {
      status: 200,
      message: 'Donation Request Fetched Successfully',
      data: donationRequest,
    }
  }

  public async destroy({}: HttpContextContract) {}
}