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
  amount: { currency: string; amount: string }
  autoCapture: boolean
  source: { id: string; type: string }
  idempotencyKey: string
  keyId?: string
  verification: string
  description: string
  encryptedData: string
  channel: string
  verificationSuccessUrl?: string
  verificationFailureUrl?: string
}
