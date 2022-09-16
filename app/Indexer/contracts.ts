import { BigNumber, Contract, utils, ContractFactory } from 'ethers'
import maraAbi from './abi/marascan.json'
import Provider from './connection/provider'

export default class Contracts extends Provider {
  constructor(network: string) {
    super(network)
  }
  public async marascanContract() {
    const contract = new ContractFactory(maraAbi.abi, maraAbi.byteCode)
    return contract.attach(this.getProxyAddress())
  }
}
