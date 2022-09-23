import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DonationRequest from 'App/Models/DonationRequest'
import DonorCircleSavedCard from 'App/Models/DonorCircleSavedCard'
import CircleService from 'App/Services/CircleService'
import { v4 as uuId } from 'uuid'
import Contracts from 'App/Indexer/contracts'
import Env from '@ioc:Adonis/Core/Env'
// import Beneficiary from 'App/Models/Beneficiary'

export default class CirclesController {
  public async notificationReceiver({ request }: HttpContextContract) {
    const { notificationType, card, payment, paymentIntent, transfer, settlement } = request.body()

    if (notificationType === 'cards') {
      // Card Creation
      console.log(card)
      const donorCard = await DonorCircleSavedCard.findByOrFail('circleCardId', card.id)

      donorCard.approvalStatus = card.status
      donorCard.circleCardData = card
      await donorCard.save()
    } else if (notificationType === 'payments') {
      console.log(payment)
      // if the payment source is card, then it must be a donation payment
      if (payment.source.type === 'card') {
        const donationRequest = await DonationRequest.findByOrFail('paymentId', payment.id)

        donationRequest.paymentStatus = payment.status === 'confirmed' ? 'paid' : 'failed'
        await donationRequest.save()

        // create a donation on the contract
        // if (payment.status === 'confirmed') {
        //   const contracts = new Contracts(Env.get('NETWORK'))
        //   const marascanContract = await contracts.marascanContract()

        //   const beneficiaries = await Beneficiary.query()
        //     .where('conservancyId', donationRequest.conservancyId)
        //     .andWhere('categoryId', donationRequest.categoryIds[0])
        //     .preload('land')

        //   const beneficiaryAddresses = beneficiaries.map(
        //     (beneficiary) => beneficiary.ethereumAccountAddress
        //   )

        //   const amountPerBeneficiary = beneficiaries.map((beneficiary) => {})

        //   marascanContract.donationFromCircle(donationRequest.amount['amount'], donationRequest.id)
        // }
      }
    } else if (notificationType === 'paymentIntents') {
      console.log(paymentIntent)
      // if the payment source is card, then it must be a donation payment
      if (
        paymentIntent.paymentMethods[0].address &&
        paymentIntent.timeline[0].status === 'pending'
      ) {
        const address = paymentIntent.paymentMethods[0].address

        console.log(address)
      } else if (
        paymentIntent.paymentMethods[0].address &&
        paymentIntent.timeline[0].status === 'complete'
      ) {
      }
    } else if (notificationType === 'transfers') {
      console.log(transfer)
    } else if (notificationType === 'settlements') {
      // Funds settlements
      console.log(settlement)
      const contracts = new Contracts(Env.get('NETWORK'))
      const marascanContract = await contracts.marascanContract()

      const res = await CircleService.getMasterWalletId()
      await CircleService.createOnchainPayout({
        idempotencyKey: uuId(),
        source: { type: 'wallet', id: res.data.payments.masterWalletId },
        destination: {
          type: 'blockchain',
          address: marascanContract.address,
          chain: 'ETH',
        },
        amount: {
          amount: settlement.totalCredits.amount,
          currency: settlement.totalCredits.currency,
        },
      })
    }
  }
}
