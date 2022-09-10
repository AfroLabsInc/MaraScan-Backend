import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CirclesController {
  public async notificationReceiver({ request }: HttpContextContract) {
    const body = request.body()
    console.log('body', JSON.parse(body))
  }
}
