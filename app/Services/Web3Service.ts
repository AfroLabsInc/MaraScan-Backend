import Web3 from 'web3'
import Env from '@ioc:Adonis/Core/Env'

class Web3Service {
  private web3: Web3
  constructor() {
    this.web3 = new Web3(Env.get('RPC_PROVIDER_URL'))
  }
  public async createBeneficiaryAccount() {
    const account = await this.web3.eth.accounts.create()

    return account
  }
}

export default new Web3Service()
