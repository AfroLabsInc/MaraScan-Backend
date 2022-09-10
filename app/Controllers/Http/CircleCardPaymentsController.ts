import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DonorCircleSavedCard from 'App/Models/DonorCircleSavedCard'
import CircleService from 'App/Services/CircleService'
import CircleCardPaymentValidator from 'App/Validators/CircleCardPaymentValidator'
import { CreatePaymentBodyType } from 'App/Types/circleTypes'
import DonationRequest from 'App/Models/DonationRequest'

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
    }

    if (result.data && result.data.status === 'failed') {
      return {
        status: 400,
        message: 'Card Failed to be Added',
      }
    } else if (result.data && result.data.status === 'complete') {
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

  public async pay({ request, params }: HttpContextContract) {
    const donationRequestId: number = params.donationRequest_id

    const payload = await CircleCardPaymentValidator.pay({ ...request.all() })

    const cardResult = await CircleService.getCard(payload.circleCardId)
    const donationRequest = await DonationRequest.findOrFail(donationRequestId)

    if (cardResult.data) {
      const { data } = cardResult
      const paymentPayload: CreatePaymentBodyType = {
        metadata: {
          email: data.metadata.email,
          phoneNumber: data.metadata.phoneNumber,
          sessionId: payload.sessionId,
          ipAddress: payload.ipAddress,
        },
        amount: {
          currency: donationRequest.amount['currency'],
          amount: `${donationRequest.amount['amount']}`,
        },
        autoCapture: true,
        source: { id: data.id, type: 'card' },
        idempotencyKey: payload.idempotencyKey,
        keyId: payload.keyId,
        verification: 'cvv',
        description: donationRequest.note || 'Donation To Save WildLife',
      }
      let result = await CircleService.createPayment(paymentPayload)

      if (result.data) {
        donationRequest.paymentId = result.data.id
        await donationRequest.save()
      }

      return {
        status: 200,
        message: 'Donation Payment Initated',
        data: result.data,
      }
    }
  }
}
