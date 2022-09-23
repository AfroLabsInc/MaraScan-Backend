import Env from '@ioc:Adonis/Core/Env'
import { errorHandler } from 'App/Utils'
import { SMSDataType } from 'App/Types/index'
import { Client } from 'africastalking-ts'
class SMSService {
  public async sendSMS(data: SMSDataType) {
    const africasTalking = new Client({
      apiKey: Env.get('AFRICASTALKING_APIKEY'),
      username: Env.get('AFRICASTALKING_USERNAME'),
    })

    try {
      await africasTalking.sendSms(data)
    } catch (error) {
      errorHandler(error)
    }
  }
}

export default new SMSService()

// const data = {
//   to: ['+254711XXXYYY', '+254733YYYZZZ'],
//   from: '',
//   message: "I'm a lumberjack and its ok, I work all night and sleep all day",
// }
