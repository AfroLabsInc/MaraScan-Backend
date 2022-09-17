import { Wallet } from 'ethers'

export default class CreateWallet {
  public static initializeNewWallet(): Wallet {
    return Wallet.createRandom()
  }
}
