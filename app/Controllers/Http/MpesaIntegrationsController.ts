import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MpesaIntegrationsController {
  public async queueHandler({ request }: HttpContextContract) {
    console.log(request.all())

    return { hello: 'world' }
  }

  public async resultHandler({ request }: HttpContextContract) {
    const { Result } = request.all()
    console.log(request.all())

    console.log(Result?.ResultParameters.ResultParameter)
    return { hello: 'world' }
  }
}
