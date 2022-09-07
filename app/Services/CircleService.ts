import Env from '@ioc:Adonis/Core/Env'
import { CreateCardBodyType } from 'App/Types/circleTypes'
import { axiosClient, errorHandler } from 'App/Utils'

class CircleService {
  private baseUrl: string
  private token: string

  constructor() {
    this.baseUrl = Env.get('CIRCLE_API_BASE_URL')
    this.token = Env.get('CIRCLE_API_TOKEN')
  }
  public async getPublicKey() {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}`,
    }
    try {
      const response = await axiosClient(this.baseUrl).get('/encryption/public', {
        headers: headers,
      })

      if (response.data) {
        return response.data
      }
    } catch (error) {
      errorHandler(error)
    }
  }

  public async createCard(data: CreateCardBodyType) {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}`,
    }
    try {
      const response = await axiosClient(this.baseUrl).post('/cards', data, {
        headers: headers,
      })

      if (response.data) {
        return response.data
      }
    } catch (error) {
      errorHandler(error)
    }
  }
}

export default new CircleService()

// const body = {
//   billingDetails: {
//     name: 'Satoshi Nakamoto',
//     city: 'Boston',
//     country: 'US',
//     line1: '100 Money Street',
//     line2: 'Suite 1',
//     district: 'MA',
//     postalCode: '01234',
//   },
//   metadata: {
//     email: 'satoshi@circle.com',
//     phoneNumber: '+14155555555',
//     sessionId: 'DE6FA86F60BB47B379307F851E238617',
//     ipAddress: '244.28.239.130',
//   },
//   idempotencyKey: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7',
//   keyId: 'key1',
//   encryptedData:
//     'LS0tLS1CRUdJTiBQR1AgTUVTU0FHRS0tLS0tCgp3Y0JNQTBYV1NGbEZScFZoQVFmL2J2bVVkNG5LZ3dkbExKVTlEdEFEK0p5c0VOTUxuOUlRUWVGWnZJUWEKMGgzQklpRFNRU0RMZmI0NEs2SXZMeTZRbm54bmFLcWx0MjNUSmtPd2hGWFIrdnNSMU5IbnVHN0lUNWJECmZzeVdleXlNK1JLNUVHV0thZ3NmQ2tWamh2NGloY29xUnlTTGtJbWVmRzVaR0tMRkJTTTBsTFNPWFRURQpiMy91eU1zMVJNb3ZiclNvbXkxa3BybzUveWxabWVtV2ZsU1pWQlhNcTc1dGc1YjVSRVIraXM5ckc0cS8KMXl0M0FOYXA3UDhKekFhZVlyTnVNZGhGZFhvK0NFMC9CQnN3L0NIZXdhTDk4SmRVUEV0NjA5WFRHTG9kCjZtamY0YUtMQ01xd0RFMkNVb3dPdE8vMzVIMitnVDZKS3FoMmtjQUQyaXFlb3luNWcralRHaFNyd3NKWgpIdEphQWVZZXpGQUVOaFo3Q01IOGNsdnhZVWNORnJuNXlMRXVGTkwwZkczZy95S3loclhxQ0o3UFo5b3UKMFVxQjkzQURKWDlJZjRBeVQ2bU9MZm9wUytpT2lLall4bG1NLzhlVWc3OGp1OVJ5T1BXelhyTzdLWTNHClFSWm8KPXc1dEYKLS0tLS1FTkQgUEdQIE1FU1NBR0UtLS0tLQo',
//   expMonth: 1,
//   expYear: 2020,
// }
