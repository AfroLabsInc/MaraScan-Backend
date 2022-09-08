import Env from '@ioc:Adonis/Core/Env'
import {
  CreateCardBodyType,
  CreateCryptoPaymentIntentType,
  CreateOnchainPayoutBodyType,
  CreatePaymentBodyType,
  CreateWirePayoutType,
} from 'App/Types/circleTypes'
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

  public async getMasterWalletId() {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}`,
    }
    try {
      const response = await axiosClient(this.baseUrl).get('/configuration', {
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

  public async getCard(cardId: string) {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}`,
    }
    try {
      const response = await axiosClient(this.baseUrl).get(`/cards/${cardId}`, {
        headers: headers,
      })

      if (response.data) {
        return response.data
      }
    } catch (error) {
      errorHandler(error)
    }
  }

  public async createPayment(data: CreatePaymentBodyType) {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}`,
    }
    try {
      const response = await axiosClient(this.baseUrl).post('/payments', data, {
        headers: headers,
      })

      if (response.data) {
        return response.data
      }
    } catch (error) {
      errorHandler(error)
    }
  }

  public async getPayment(paymentId: string) {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}`,
    }
    try {
      const response = await axiosClient(this.baseUrl).get(`/payments/${paymentId}`, {
        headers: headers,
      })

      if (response.data) {
        return response.data
      }
    } catch (error) {
      errorHandler(error)
    }
  }

  public async createCryptoPaymentIntent(data: CreateCryptoPaymentIntentType) {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}`,
    }
    try {
      const response = await axiosClient(this.baseUrl).post('/paymentIntents', data, {
        headers: headers,
      })

      if (response.data) {
        return response.data
      }
    } catch (error) {
      errorHandler(error)
    }
  }

  public async getCryptoPaymentIntent(paymentIntentId: string) {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}`,
    }
    try {
      const response = await axiosClient(this.baseUrl).get(`/paymentIntents/${paymentIntentId}`, {
        headers: headers,
      })

      if (response.data) {
        return response.data
      }
    } catch (error) {
      errorHandler(error)
    }
  }

  public async createOnchainPayout(data: CreateOnchainPayoutBodyType) {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}`,
    }
    try {
      const response = await axiosClient(this.baseUrl).post('/transfers', data, {
        headers: headers,
      })

      if (response.data) {
        return response.data
      }
    } catch (error) {
      errorHandler(error)
    }
  }

  public async createWirePayout(data: CreateWirePayoutType) {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}`,
    }
    try {
      const response = await axiosClient(this.baseUrl).post('/payouts', data, {
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

// const cardBody = {
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

// const paymentBody = {
//   metadata: {
//     email: 'satoshi@circle.com',
//     phoneNumber: '+14155555555',
//     sessionId: 'DE6FA86F60BB47B379307F851E238617',
//     ipAddress: '244.28.239.130',
//   },
//   amount: { currency: 'USD', amount: '3.14' },
//   autoCapture: true,
//   source: { id: 'b8627ae8-732b-4d25-b947-1df8f4007a29', type: 'card' },
//   idempotencyKey: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7',
//   keyId: 'key1',
//   verification: 'cvv',
//   description: 'Payment',
//   encryptedData: 'UHVibGljS2V5QmFzZTY0RW5jb2RlZA==',
//   channel: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7',
//   verificationSuccessUrl: 'https://www.example.com/3ds/verificationsuccessful',
//   verificationFailureUrl: 'https://www.example.com/3ds/verificationfailure',
// }

// const OnchainPayoutBody = {
//   source: { type: 'wallet', id: '12345' },
//   destination: {
//     type: 'blockchain',
//     address: '0x8381470ED67C3802402dbbFa0058E8871F017A6F',
//     addressTag: '123456789',
//     chain: 'ETH',
//   },
//   amount: { amount: '3.14', currency: 'USD' },
//   idempotencyKey: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7',
// }

// const WirePayoutBody = {
//   source: { type: 'wallet', id: '12345' },
//   destination: { type: 'wire', id: 'b8627ae8-732b-4d25-b947-1df8f4007a29' },
//   amount: { currency: 'USD', amount: '3.14' },
//   metadata: { beneficiaryEmail: 'satoshi@circle.com' },
//   idempotencyKey: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7',
// }

// const paymentIntentBody = {
//   amount: { amount: '3.14', currency: 'USD' },
//   amountPaid: { currency: 'USD' },
//   paymentMethods: [{ type: 'blockchain', chain: 'ETH' }],
//   idempotencyKey: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7',
//   settlementCurrency: 'USD',
// }
