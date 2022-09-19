export type NetworkType = {
  network: string
  name: string
  label: string
  value: string
  chainId: number
  currency: string
  rpc: string[]
  explorer: string
  api: string
}

export abstract class NetworkUtilsType {
  public static getRpcUrl: (network: string) => string
  public static getNetwork: (network: string) => NetworkType | undefined
}

export type DonationEventType = {
  donor: string
  amount: number
  donationRequestId: number
  currentUndisbursedBalance: number
}

export type DisbursedEventType = {
  donorAddress: string
  donationRequestId: number
  amountDisbursed: number
  beneficiaryAddress: string
  amountForBeneficiary: number
}
