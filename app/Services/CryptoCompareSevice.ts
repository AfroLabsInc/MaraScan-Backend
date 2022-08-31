import Env from '@ioc:Adonis/Core/Env'
import { axiosClient, errorHandler } from 'App/Utils'

export default class CryptoCompareService {
  public static async getUSDTValue(crypto: string) {
    const params = {
      fsym: crypto,
      tsyms: 'USD',
    }
    try {
      const response = axiosClient('https://min-api.cryptocompare.com', `Apikey ${}`).get('/data/price', {
        params,
      })
    } catch (error) {
      errorHandler(error)
    }
  }
}
