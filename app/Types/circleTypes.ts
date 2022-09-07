type BillingDetails = {
  name: string
  city: string
  country: string
  line1: string
  line2?: string
  district?: string
  postalCode: string
}
type MetaData = {
  email: string
  phoneNumber?: string
  sessionId: string
  ipAddress: string
}

type Amount = { amount: string; currency: string }

export type CreateCardBodyType = {
  billingDetails: BillingDetails
  metadata: MetaData
  idempotencyKey: string
  keyId?: string
  encryptedData: string
  expMonth: number
  expYear: number
}

export type CreatePaymentBodyType = {
  metadata: MetaData
  amount: Amount
  autoCapture: boolean
  source: { id: string; type: string }
  idempotencyKey: string
  keyId?: string
  verification: string
  description: string
  encryptedData: string
  channel?: string
  verificationSuccessUrl?: string
  verificationFailureUrl?: string
}

export type CreateCryptoPaymentIntentType = {
  amount: Amount
  amountPaid: { currency: string }
  paymentMethods: [{ type: string; chain: string }]
  idempotencyKey: string
  settlementCurrency: string
}

export type CreateOnchainPayoutBodyType = {
  source: { type: string; id: string }
  destination: {
    type: string
    address: string
    addressTag?: string
    chain: string
  }
  amount: Amount
  idempotencyKey: string
}

export type CreateWirePayoutType = {
  source: { type: string; id: string }
  destination: { type: string; id: string }
  amount: Amount
  metadata: { beneficiaryEmail: string }
  idempotencyKey: string
}
