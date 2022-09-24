import { DisbursedEventType, DonationEventType } from 'App/Indexer/types/types'
import Beneficiary from 'App/Models/Beneficiary'
import DonationRequest from 'App/Models/DonationRequest'
import { AmountPerBeneficiaryObj } from 'App/Types'
import CoinMarketCapService from './CoinMarketCapSevice'
// import { utils, BigNumber } from 'ethers'
import SMSService from './SMSService'

class MarascanService {
  public async donation(data: DonationEventType) {
    const donationRequest = await DonationRequest.findOrFail(data.donationRequestId)

    const amountPerBeneficiary: AmountPerBeneficiaryObj[] = []
    for (const beneficiary of data.beneficiaries) {
      amountPerBeneficiary.push({
        address: beneficiary[0],
        amount: Number(beneficiary[1] / Math.pow(10, 6)),
      })
    }

    await donationRequest
      .merge({
        paymentStatus: 'paid',
        amountPerBeneficiary: amountPerBeneficiary,
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

    for (const amountPerBeneficiary of donationRequest.amountPerBeneficiary) {
      const beneficiary = await Beneficiary.findByOrFail(
        'ethereumAccountAddress',
        amountPerBeneficiary['address']
      )

      const kesAmount = await CoinMarketCapService.getKESValue(
        'USDC',
        Number(amountPerBeneficiary['amount'])
      )

      const smsData = {
        to: [beneficiary.mobile],
        from: 'MachoMara',
        message: `You Have Received a Donation of ${kesAmount.toFixed(
          2
        )} KES, Dial *384*37083#	M-Pesa`,
      }

      await SMSService.sendSMS(smsData)
    }
  }
}

export default new MarascanService()
