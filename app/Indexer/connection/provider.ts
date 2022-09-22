import { providers } from 'ethers'
import NetworkUtils from '../utils/networkUtils'
export default class Provider {
  public provider: providers.JsonRpcProvider
  public network: string
  constructor(network: string) {
    this.network = network
    this.provider = new providers.JsonRpcProvider(NetworkUtils.getRpcUrl(network))
  }

  public getMarascanProxyAddress(): string {
    return NetworkUtils.getMarascanProxyAddress(this.network)
  }

  public getMarascanOperationProxyAddress(): string {
    return NetworkUtils.getMarascanOperationProxyAddress(this.network)
  }

  public getUSDCAddress(): string {
    return NetworkUtils.getUSDCAddress(this.network)
  }

  public getProvider(): providers.JsonRpcProvider {
    return this.provider
  }

  // set provider to preffered
  public setProvider(network: string) {
    this.provider = new providers.JsonRpcProvider(NetworkUtils.getRpcUrl(network))
  }

  public getRpcUrl(network) {
    return NetworkUtils.getRpcUrl(network)
  }

  public getChainId(network) {
    return NetworkUtils.getChainId(network)
  }
}
