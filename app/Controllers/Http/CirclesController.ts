import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DonationRequest from 'App/Models/DonationRequest'

export default class CirclesController {
  public async notificationReceiver({ request }: HttpContextContract) {
    const { notificationType, card, payment, transfer, settlement } = request.body()

    if (notificationType === 'cards') {
      // Card Creation
      console.log(card)
    } else if (notificationType === 'payments') {
      console.log(payment)
      // if the payment source is card, then it must be a donation payment
      if (payment.source.type === 'card') {
        const donationRequest = await DonationRequest.findByOrFail('paymentId', payment.id)

        donationRequest.paymentStatus = payment.status === 'confirmed' ? 'paid' : 'failed'
        await donationRequest.save()
      }
    } else if (notificationType === 'transfers') {
      console.log(transfer)
    } else if (notificationType === 'settlements') {
      // Funds settlements
      console.log(settlement)
    }
  }
}
