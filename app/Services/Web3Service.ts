import Web3 from 'web3'
import Env from '@ioc:Adonis/Core/Env'
import Beneficiary from 'App/Models/Beneficiary'

class Web3Service {
  private web3: Web3
  constructor() {
    this.web3 = new Web3(Env.get('RPC_PROVIDER_URL'))
  }
  public async createBeneficiaryAccount() {
    const account = await this.web3.eth.accounts.create()

    return account
  }

  public async checkBeneficiaryBalance(beneficiaryId: number) {
    const beneficiary = await Beneficiary.findOrFail(beneficiaryId)

    const weiBalance = await this.web3.eth.getBalance(beneficiary.ethereumAccountAddress)

    const etherBalance = await this.web3.utils.fromWei(weiBalance, 'ether')

    return Number(etherBalance)
  }
}

export default new Web3Service()
