import MarascanService from 'App/Services/MarascanService'
import { utils, BigNumber } from 'ethers'
import Contracts from './contracts'
import Env from '@ioc:Adonis/Core/Env'
import CoinMarketCapService from 'App/Services/CoinMarketCapSevice'

import { DisbursedEventType, DonationEventType } from './types/types'

const get = async () => {
  console.log(await CoinMarketCapService.getUSDValue('KES', 100))
}
get()

const marascanContractIndex = async () => {
  const contracts = new Contracts(Env.get('NETWORK'))
  const marascanContract = await contracts.marascanContract()

  // console.log(await marascanContract.USDC())

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

      await MarascanService.donation(data)

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

    await MarascanService.disbursement(data)

    console.log(data)
  })
}

marascanContractIndex()
