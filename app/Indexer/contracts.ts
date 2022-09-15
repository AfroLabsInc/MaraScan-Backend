import { BigNumber, Contract, utils, ContractFactory } from 'ethers'
import maraAbi from './abi/marascan.json'

export default class Contracts {
  private marascanProxyAddress

  constructor() {
    this.marascanProxyAddress = ''
  }
  public async marascanContract() {
    const contract = new ContractFactory(maraAbi.abi, maraAbi.byteCode)
    return contract.attach(this.marascanProxyAddress)
  }
}
