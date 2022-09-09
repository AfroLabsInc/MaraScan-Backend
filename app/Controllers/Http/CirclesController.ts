import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CirclesController {
  public async notificationSubscriber({ request }: HttpContextContract) {
    console.log(request.all())
  }
}
