import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CircleService from 'App/Services/CircleService'
import CircleCardPaymentValidator from 'App/Validators/CircleCardPaymentValidator'

export default class CircleCardPaymentsController {
  public async getPublicKey({}: HttpContextContract) {
    const response = await CircleService.getPublicKey()

    return response
  }
  public async addNewCard({ request }: HttpContextContract) {
    const payload = await CircleCardPaymentValidator.addNewCard({ ...request.all() })

    const result = await CircleService.createCard(payload)

    console.log(result)

    return {
      status: 201,
      message: 'Card Added Successfully',
    }
  }

  public async pay({}: HttpContextContract) {}
}
