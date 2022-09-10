import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'

export default class CirclesController {
  public async notificationSubscriber({ request, response }: HttpContextContract) {
    console.log(request.all())
    console.log(request.request)

    let body = ''

    request.request.on('data', (chunk) => {
      body += chunk.toString()
    })

    request.request.on('end', () => {
      let payload = JSON.parse(body)

      console.log(payload)

      if (payload.Type === 'SubscriptionConfirmation') {
        const url = payload.SubscribeURL

        axios.get(url).then((res) => {
          if (res.status === 200) {
            console.log('Yes! We have accepted the confirmation from AWS')
            response.response.statusCode = 200
            response.response.end()
          }
        })
      }

      if (payload.Type === 'Notification') {
        const msg = payload.Message
        console.log(msg)
        response.response.statusCode = 200
        response.response.end()
      }

      if (payload.Type === 'UnsubscribeConfirmation') {
        console.log('Unsubscribed')
        response.response.statusCode = 200
        response.response.end()
      }
    })
  }
}
