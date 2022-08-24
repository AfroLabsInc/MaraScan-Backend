import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UssdsController {
  public async handler({ request, response }: HttpContextContract) {
    console.log(request.all())

    response.status(200)
    return {
      message: 'Called',
    }
  }
}
