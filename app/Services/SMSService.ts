import Env from '@ioc:Adonis/Core/Env'
import { errorHandler, axiosClient } from 'App/Utils'
import { SMSDataType } from 'App/Types/index'

class SMSService {
  public async sendSMS(data: SMSDataType) {
    const headers = {
      'apiKey': Env.get('AFRICASTALKING_APIKEY'),
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    try {
      const response = await axiosClient(Env.get('AFRICASTALKING_BASE_URL')).post(
        '/messaging',
        data,
        {
          headers,
        }
      )

      if (response.data) {
        return response.data
      }
    } catch (error) {
      errorHandler(error)
    }
  }
}

export default new SMSService()
