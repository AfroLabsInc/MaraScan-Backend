import Env from '@ioc:Adonis/Core/Env'
import { axiosClient, errorHandler } from 'App/Utils'

export default class CoinMarketCapService {
  public static async getKESValue(crypto: string, amount: number) {
    const headers = {
      'X-CMC_PRO_API_KEY': Env.get('COIN_MARKET_CAP_API_KEY'),
    }
    const params = {
      symbol: crypto,
      amount: amount,
      convert: 'KES',
    }
    try {
      const response = await axiosClient(Env.get('COIN_MARKET_CAP_API_BASE_URL')).get(
        '/v2/tools/price-conversion',
        {
          headers,
          params,
        }
      )

      if (response.data.status.error_code === 0) {
        return response.data.data[0].quote.KES.price
      }
    } catch (error) {
      errorHandler(error)
    }
  }
  public static async getUSDValue(crypto: string, amount: number) {
    const headers = {
      'X-CMC_PRO_API_KEY': Env.get('COIN_MARKET_CAP_API_KEY'),
    }
    const params = {
      symbol: crypto,
      amount: amount,
      convert: 'USDC',
    }
    try {
      const response = await axiosClient(Env.get('COIN_MARKET_CAP_API_BASE_URL')).get(
        '/v2/tools/price-conversion',
        {
          headers,
          params,
        }
      )

      if (response.data.status.error_code === 0) {
        return response.data.data[0].quote.USDC.price
      }
    } catch (error) {
      errorHandler(error)
    }
  }
}
