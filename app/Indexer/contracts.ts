import { ContractFactory, Contract, Wallet } from 'ethers'
import maraAbi from './abi/marascan.json'
import Provider from './connection/provider'
import CreateWallet from './connection/wallet'
import usdcAbi from './abi/erc20.json'

export default class Contracts extends Provider {
  private wallet: Wallet
  constructor(network: string) {
    super(network)
    this.wallet = CreateWallet.initializeNewWallet()
  }

  private async initializeSinger(): Promise<Wallet> {
    return await this.wallet.connect(this.provider)
  }
  public async marascanContract() {
    const contract = new ContractFactory(
      maraAbi.abi,
      maraAbi.bytecode,
      await this.initializeSinger()
    )
    return contract.attach(this.getProxyAddress())
  }

  public async usdcContract() {
    const contract = new Contract(this.getUSDCAddress(), usdcAbi, await this.initializeSinger())
    return contract
  }
}
