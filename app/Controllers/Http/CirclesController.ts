import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CirclesController {
  public async notificationListener({ request }: HttpContextContract) {
    console.log(request.all())
    // console.log(request.request)
  }
}
