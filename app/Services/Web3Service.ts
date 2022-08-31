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

    const balance = await this.web3.eth.getBalance(beneficiary.ethereumAccountAddress)

    return this.web3.utils.fromWei(balance, 'ether')
  }
}

export default new Web3Service()
