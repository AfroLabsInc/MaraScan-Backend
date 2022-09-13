import Africastalking from 'africastalking'
import Env from '@ioc:Adonis/Core/Env'
import { errorHandler } from 'App/Utils'
import { SMSDataType } from 'App/Types/index'

class SMSService {
  private africastalking

  constructor() {
    this.africastalking = Africastalking({
      apikey: Env.get('AFRICASTALKING_APIKEY'),
      username: Env.get('AFRICASTALKING_USERNAME'),
    })
  }

  public async sendSMS(data: SMSDataType) {
    const sms = this.africastalking.SMS

    try {
      await sms.send(data)
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
