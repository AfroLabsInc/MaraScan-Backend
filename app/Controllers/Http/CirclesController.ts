import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CirclesController {
  public async notificationReceiver({ request }: HttpContextContract) {
    console.log(request.all())
    // console.log(request.request)
  }
}
