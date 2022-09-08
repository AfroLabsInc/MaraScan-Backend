import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DonorCircleSavedCard from 'App/Models/DonorCircleSavedCard'
import CircleService from 'App/Services/CircleService'
import CircleCardPaymentValidator from 'App/Validators/CircleCardPaymentValidator'

export default class CircleCardPaymentsController {
  public async getPublicKey({}: HttpContextContract) {
    const response = await CircleService.getPublicKey()

    return response
  }
  public async addNewCard({ request, params }: HttpContextContract) {
    const donorId: number = params.donor_id
    const payload = await CircleCardPaymentValidator.addNewCard({ ...request.all() })

    let result
    let responseData

    result = await CircleService.createCard(payload)

    if (result.data && result.data.status === 'pending') {
      result = await CircleService.getCard(result.data.id)
    } else if (result.data && result.data.status === 'failed') {
      console.log('failed')
    } else {
      const { data } = result
      await DonorCircleSavedCard.create({
        donorId,
        circleCardId: data.id,
        network: data.network,
        circleCardData: data,
      })
      responseData = data
    }

    return {
      status: 201,
      message: 'Card Added Successfully',
      data: responseData,
    }
  }

  public async getDonorCards({ params }: HttpContextContract) {
    const donorId: number = params.donor_id

    const donorCards = await DonorCircleSavedCard.query().where('donorId', donorId)

    const cards = donorCards.map((card) => card.circleCardData)

    return {
      status: 201,
      message: 'Cards Fetched Successfully',
      data: cards,
    }
  }

  public async pay({ request, auth, params }: HttpContextContract) {
    const donorId = auth.user!.id

    console.log(donorId)
  }
}
