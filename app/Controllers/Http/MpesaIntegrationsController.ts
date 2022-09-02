import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MpesaIntegrationsController {
  public async accountBalanceQueueHandler({ request }: HttpContextContract) {
    console.log(request.all())

    return { hello: 'world' }
  }

  public async accountBalanceResultHandler({ request }: HttpContextContract) {
    // const { Result } = request.all()
    console.log(request.all())

    // console.log(Result?.ResultParameters.ResultParameter)
    return { hello: 'world' }
  }

  public async b2cQueueHandler({ request }: HttpContextContract) {
    console.log(request.all())

    return { hello: 'world' }
  }

  public async b2cResultHandler({ request }: HttpContextContract) {
    const { Result } = request.all()
    console.log(request.all())

    console.log(Result?.ResultParameters.ResultParameter)
    return { hello: 'world' }
  }
}
