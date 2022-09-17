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

export type DonationEventtype = {
  donor: string
  amount: number
  donationRequestId: number
  previousUndisbursedBalance: number
  currentUndisbursedBalance: number
  categories: number[]
  minimumAmountToDisburse: number
}
