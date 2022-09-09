import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DonorCircleSavedCard from 'App/Models/DonorCircleSavedCard'
import CircleService from 'App/Services/CircleService'
import CircleCardPaymentValidator from 'App/Validators/CircleCardPaymentValidator'
import { CreatePaymentBodyType } from 'App/Types/circleTypes'

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
    const donationRequestId: number = params.donationRequest_id

    const payload = await CircleCardPaymentValidator.pay({ ...request.all() })

    const cardResult = await CircleService.getCard(payload.circleCardId)

    if (cardResult.data) {
      const { data } = cardResult
      const paymentPayload: CreatePaymentBodyType = {
        metadata: {
          email: 'satoshi@circle.com',
          phoneNumber: '+14155555555',
          sessionId: 'DE6FA86F60BB47B379307F851E238617',
          ipAddress: '244.28.239.130',
        },
        amount: { currency: 'USD', amount: '3.14' },
        autoCapture: true,
        source: { id: 'b8627ae8-732b-4d25-b947-1df8f4007a29', type: 'card' },
        idempotencyKey: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7',
        keyId: 'key1',
        verification: 'cvv',
        description: 'Payment',
        encryptedData: 'UHVibGljS2V5QmFzZTY0RW5jb2RlZA==',
        channel: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7',
        verificationSuccessUrl: 'https://www.example.com/3ds/verificationsuccessful',
        verificationFailureUrl: 'https://www.example.com/3ds/verificationfailure',
      }
      const result = await CircleService.createPayment(paymentPayload)
    }

    console.log(donorId)
  }
}
