import { BigNumber, utils } from 'ethers'
import Contracts from './contracts'
import { DonationEventtype } from './types/types'

const marascanContractIndex = async () => {
  const contracts = new Contracts('goerli')
  const marascanContract = await contracts.marascanContract()

  // Donation Event
  marascanContract.on(
    'Donated',
    async (
      donor,
      amount,
      donationRequestId,
      previousUndisbursedBalance,
      currentUndisbursedBalance,
      categories,
      minimumAmountToDisburse
    ) => {
      const data: DonationEventtype = {
        donor: donor,
        amount: Number(utils.formatUnits(amount, 6)),
        donationRequestId: donationRequestId,
        previousUndisbursedBalance: Number(utils.formatUnits(previousUndisbursedBalance, 6)),
        currentUndisbursedBalance: Number(utils.formatUnits(currentUndisbursedBalance, 6)),
        categories: categories,
        minimumAmountToDisburse: Number(utils.formatUnits(minimumAmountToDisburse, 6)),
      }

      console.log(data)
    }
  )

  // Disbursement Event
  marascanContract.on('Disbursed', async (amount, donations) => {})
}

marascanContractIndex()
