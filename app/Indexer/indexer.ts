// import MarascanService from 'App/Services/MarascanService'
import MpesaService from 'App/Services/MpesaService'
import { utils, BigNumber } from 'ethers'
import Contracts from './contracts'
import { DisbursedEventType, DonationEventType } from './types/types'

MpesaService.b2c()

const marascanContractIndex = async () => {
  const contracts = new Contracts('goerli')
  const marascanContract = await contracts.marascanContract()

  console.log(await marascanContract.USDC())

  // Donation Event
  await marascanContract.on(
    'Donated',
    async (donor, amount, donationRequestId, currentUndisbursedBalance) => {
      const data: DonationEventType = {
        donor: donor,
        amount: Number(utils.formatUnits(amount, 6)),
        donationRequestId: BigNumber.from(donationRequestId).toNumber(),
        currentUndisbursedBalance: Number(utils.formatUnits(currentUndisbursedBalance, 6)),
      }

      console.log(data)
    }
  )

  // let eventFilter = marascanContract.filters.Disbursed()
  // let events = await marascanContract.queryFilter(eventFilter)

  // console.log(events)

  // console.log(marascanContract.filters)

  // Disbursement Event
  await marascanContract.on('Disbursed', async (donation) => {
    let dataArray = donation.toString().split(',')
    const data: DisbursedEventType = {
      donorAddress: dataArray[0],
      donationRequestId: Number(dataArray[1]),
      amountDisbursed: Number(dataArray[2]) / Math.pow(10, 6),
      beneficiaryAddress: dataArray[3],
      amountForBeneficiary: Number(dataArray[4] / Math.pow(10, 6)),
    }

    // await MarascanService.disbursement

    console.log(data)
  })
}

marascanContractIndex()
