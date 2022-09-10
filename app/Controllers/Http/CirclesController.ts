import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CirclesController {
  public async notificationReceiver({ request }: HttpContextContract) {
    const { notificationType, payment } = request.body()

    console.log(notificationType)
    console.log(payment)
  }
}
