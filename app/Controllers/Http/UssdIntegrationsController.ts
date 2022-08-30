import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import USSDService from 'App/Services/USSDService'

export default class UssdIntegrationsController {
  public async handler({ request }: HttpContextContract) {
    const { phoneNumber, text, sessionId, serviceCode } = request.all()
    console.log(request.all())

    let response = ''

    if (!text) {
      // This is the first request. Note how we start the response with CON
      response = await USSDService.entry({ phoneNumber, text, sessionId })
    } else {
      response = await USSDService.continuation({ phoneNumber, text, sessionId, serviceCode })
    }

    return response
  }
}
