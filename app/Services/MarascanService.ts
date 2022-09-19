import { DisbursedEventType, DonationEventType } from 'App/Indexer/types/types'
import DonationRequest from 'App/Models/DonationRequest'

class MarascanService {
  public async donation(data: DonationEventType) {
    const donationRequest = await DonationRequest.findOrFail(data.donationRequestId)

    await donationRequest
      .merge({
        paymentStatus: 'paid',
      })
      .save()
  }

  public async disbursement(data: DisbursedEventType) {
    const donationRequest = await DonationRequest.findOrFail(data.donationRequestId)

    await donationRequest
      .merge({
        isDisbursed: true,
        disbursedAmount: data.amountDisbursed,
      })
      .save()
  }
}

export default new MarascanService()
