import MarascanService from 'App/Services/MarascanService'
import { utils, BigNumber } from 'ethers'
import Contracts from './contracts'
import Env from '@ioc:Adonis/Core/Env'
import { DisbursedEventType, DonationEventType } from './types/types'
import BeneficiaryWithdrawal from 'App/Models/BeneficiaryWithdrawal'
import Beneficiary from 'App/Models/Beneficiary'
import CoinMarketCapService from 'App/Services/CoinMarketCapSevice'
import SMSService from 'App/Services/SMSService'

// const test = async () => {
//   // console.log(await CircleService.getMasterWalletId())
// }
// test()
const marascanContractIndex = async () => {
  const contracts = new Contracts(Env.get('NETWORK'))
  const marascanContract = await contracts.marascanContract()

  // console.log(await marascanContract.USDC())

  // Donation Event
  await marascanContract.on(
    'Donated',
    async (donor, amount, donationRequestId, currentUndisbursedBalance, beneficiaries) => {
      const data: DonationEventType = {
        donor: donor,
        amount: Number(utils.formatUnits(amount, 6)),
        donationRequestId: BigNumber.from(donationRequestId).toNumber(),
        currentUndisbursedBalance: Number(utils.formatUnits(currentUndisbursedBalance, 6)),
        beneficiaries: beneficiaries,
      }

      await MarascanService.donation(data)

      console.log(data)
    }
  )

  // Disbursement Event
  await marascanContract.on('Disbursed', async (donation) => {
    let dataArray = donation.toString().split(',')
    const data: DisbursedEventType = {
      donorAddress: dataArray[0],
      donationRequestId: Number(dataArray[1]),
      amountDisbursed: Number(dataArray[2]) / Math.pow(10, 6),
    }

    await MarascanService.disbursement(data)

    console.log(data)
  })
}

const maraScanOperationsIndex = async () => {
  const contracts = new Contracts(Env.get('NETWORK'))
  const maraScanOperationsContract = await contracts.marascanOperationsContract()

  await maraScanOperationsContract.on('UserWithdrawal', async (beneficiary, amount) => {
    console.log(beneficiary, amount)

    const beneficiaryRecord = await Beneficiary.findByOrFail('ethereumAccountAddress', beneficiary)
    await (
      await BeneficiaryWithdrawal.findByOrFail('beneficiaryId', beneficiaryRecord.id)
    )
      .merge({
        usdAmount: Number(utils.formatUnits(amount, 6)),
        status: 'completed',
      })
      .save()

    const kesAmount = await CoinMarketCapService.getKESValue(
      'USDC',
      Number(utils.formatUnits(amount, 6))
    )

    const smsData = {
      to: [beneficiaryRecord.mobile],
      from: 'MachoMara',
      message: `You Have Successfully Withdrawn ${kesAmount.toFixed(2)} KES To Your M-Pesa`,
    }

    await SMSService.sendSMS(smsData)
  })
}

marascanContractIndex()
maraScanOperationsIndex()
