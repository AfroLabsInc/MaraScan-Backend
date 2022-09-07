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
