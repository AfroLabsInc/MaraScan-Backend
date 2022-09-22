import { Wallet } from 'ethers'
import Env from '@ioc:Adonis/Core/Env'

export default class CreateWallet {
  public static initializeNewWallet(): Wallet {
    return new Wallet(Env.get('MASTER_WALLET_PRIVATE_KEY'))
  }
}
