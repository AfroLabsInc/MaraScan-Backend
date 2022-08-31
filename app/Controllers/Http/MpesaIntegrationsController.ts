import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import CoinMarketCapService from 'App/Services/CoinMarketCapSevice'
// import { convertFiatCurrencies } from 'App/Utils'

export default class MpesaIntegrationsController {
  public async queueHandler({ request }: HttpContextContract) {
    console.log(request.all())

    // const res = await CoinMarketCapService.getUSDTValue('ETH', 0.02)

    // console.log(await convertFiatCurrencies('USD', 'KES', res))

    return { hello: 'world' }
  }

  public async resultHandler({ request }: HttpContextContract) {
    const { Result } = request.all()
    console.log(request.all())

    console.log(Result?.ResultParameters.ResultParameter)
    return { hello: 'world' }
  }
}
