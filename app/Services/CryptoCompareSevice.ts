import Env from '@ioc:Adonis/Core/Env'
import { axiosClient, errorHandler } from 'App/Utils'

export default class CryptoCompareService {
  public static async getUSDTValue(crypto: string) {
    const params = {
      fsym: crypto,
      tsyms: 'USD',
    }
    try {
      const response = await axiosClient(
        Env.get('CRYPTO_COMPARE_API_BASE_URL'),
        `Apikey ${Env.get('CRYPTO_COMPARE_API_KEY')}`
      ).get('/data/price', {
        params,
      })

      return response.data
    } catch (error) {
      errorHandler(error)
    }
  }
}
