import Web3 from 'web3'
import { BigNumber } from 'ethers'
import Env from '@ioc:Adonis/Core/Env'
import Beneficiary from 'App/Models/Beneficiary'
import Contracts from 'App/Indexer/contracts'
import Provider from 'App/Indexer/connection/provider'
import { decryptText } from 'App/Utils'

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

    const contracts = new Contracts(Env.get('NETWORK'))

    const usdcContract = await contracts.usdcContract()

    let balance = await usdcContract.balanceOf(beneficiary.ethereumAccountAddress)

    balance = BigNumber.from(balance).toNumber()

    return Number(balance / Math.pow(10, 6))
  }

  /**
   * @dev Convert amount from K
   * @param beneficiaryId : number
   * @param amount : number
   */
  public async withdrawFromWallet(beneficiaryId: number, amount: number) {
    const beneficiary = await Beneficiary.findOrFail(beneficiaryId)
    const privateKey = await decryptText(beneficiary.ethereumAccountPrivateKey)

    // implementing EIP3009
    const contracts = new Contracts(Env.get('NETWORK'))

    const maraScanOperationsContract = await contracts.marascanOperationsContract()

    const dataType = {
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        TransferWithAuthorization: [
          { name: "from", type: "address" },
          { name: "to", type: "address" },
          { name: "value", type: "uint256" },
          { name: "validAfter", type: "uint256" },
          { name: "validBefore", type: "uint256" },
          { name: "nonce", type: "bytes32" },
        ],
      },
      domain: {
        name: "USD Coin",
        version: "2",
        chainId: 5,  // chainId of network
        verifyingContract: maraScanOperationsContract.address,
      },
      primaryType: "TransferWithAuthorization",
      message: {
        from: beneficiary.ethereumAccountAddress,
        to: maraScanOperationsContract.address,
        value: Math.pow(10, 6) * amount,  // amount
        validAfter: 0,
        validBefore: Math.floor(Date.now() / 1000) + 3600, // Valid for an hour
        nonce: Web3.utils.randomHex(32),
      },
    };

    console.log(beneficiary)
  }
}

export default new BeneficiaryEthereumAccountService(Env.get('NETWORK'))
