import Web3 from 'web3'
import { BigNumber } from 'ethers'
import Env from '@ioc:Adonis/Core/Env'
import Beneficiary from 'App/Models/Beneficiary'
import Contracts from 'App/Indexer/contracts'
import Provider from 'App/Indexer/connection/provider'

class BeneficiaryEthereumAccountService extends Provider {
  private web3: Web3
  constructor(network: string) {
    super(network)
    this.web3 = new Web3(this.getRpcUrl(Env.get('NETWORK')))
  }
  public async createBeneficiaryAccount() {
    const account = await this.web3.eth.accounts.create()

    return account
  }

  public async checkBeneficiaryBalance(beneficiaryId: number) {
    const beneficiary = await Beneficiary.findOrFail(beneficiaryId)

    console.log(beneficiary)

    const contracts = new Contracts(Env.get('NETWORK'))

    const usdcContract = await contracts.usdcContract()

    console.log(usdcContract)

    let balance = await usdcContract.balanceOf(beneficiary.ethereumAccountAddress)

    balance = BigNumber.from(balance).toNumber()

    console.log(balance)

    return Number(balance / Math.pow(10, 6))
  }

  public async withdrawFromWallet(beneficiaryId: number) {
    const beneficiary = await Beneficiary.findOrFail(beneficiaryId)

    console.log(beneficiary)
  }
}

export default new BeneficiaryEthereumAccountService(Env.get('NETWORK'))
