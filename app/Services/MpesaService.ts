import Env from '@ioc:Adonis/Core/Env'
import { Mpesa } from 'mpesa-api'

class MpesaService {
  private mpesaApi
  private baseUrl
  constructor() {
    const credentials = {
      clientKey: 'j14jyqkd0Gdib8qp6ksl5GpF5XMhlXyY',
      clientSecret: '5gUQVPlQCKkMIyNQ',
      initiatorPassword:
        'G/BxuNOntay0lAKD/5RnvUUUb+tv+5azDcZHK8fDG72tVZjbtjgshp5TngUrdnzvrio628QU6Ky0fBbEyzsLiciCtoo9bwIxOuQl3gfmNUlzgwwLj2RXTe5H/ZEaDfy+eEb9uu0XGm6Vlgme2J6YuKE5QFvc6ooHZt1TTROAZXnjduOuO+AP3geSbI6XYgJw+ziHiDVruHbO1KbKUeDgUIHKvAORnOCPF8CIVBUFAiKgmfRYzywlLp7YNXnQlNp5nuj96oc29Iyjv+rKAaDl6cLR2aNRTATsUuGDlp0YI+uQ/b623z97otftEgU7NtYorsga3M2dRlVEW+aBSRx5Ng==',
      securityCredential:
        'G/BxuNOntay0lAKD/5RnvUUUb+tv+5azDcZHK8fDG72tVZjbtjgshp5TngUrdnzvrio628QU6Ky0fBbEyzsLiciCtoo9bwIxOuQl3gfmNUlzgwwLj2RXTe5H/ZEaDfy+eEb9uu0XGm6Vlgme2J6YuKE5QFvc6ooHZt1TTROAZXnjduOuO+AP3geSbI6XYgJw+ziHiDVruHbO1KbKUeDgUIHKvAORnOCPF8CIVBUFAiKgmfRYzywlLp7YNXnQlNp5nuj96oc29Iyjv+rKAaDl6cLR2aNRTATsUuGDlp0YI+uQ/b623z97otftEgU7NtYorsga3M2dRlVEW+aBSRx5Ng==',
      certificatePath: null,
    }
    this.baseUrl = Env.get('BACKEND_BASE_URL')
    this.mpesaApi = new Mpesa(credentials, Env.get('MPESA_ENVIRONMENT'))
  }
  public async b2c() {
    // const { shortCode, initiatorName } = this.mpesaApi.configs

    const testMSISDN = '254708374149'
    try {
      await this.mpesaApi.b2c({
        Initiator: 'testapi',
        Amount: 1000 /* 1000 is an example amount */,
        PartyA: '600584',
        PartyB: testMSISDN,
        QueueTimeOutURL: `${this.baseUrl}/callbacks/business-to-customer/queue`,
        ResultURL: `${this.baseUrl}/callbacks/business-to-customer/result`,
        CommandID: 'BusinessPayment' /* OPTIONAL */,
        Occasion: 'Occasion' /* OPTIONAL */,
        Remarks: 'Remarks' /* OPTIONAL */,
      })
    } catch (error) {
      console.log(error)
    }

    // console.log(this.mpesaApi)
  }

  public async balance() {}
}

export default new MpesaService()
