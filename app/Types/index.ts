export type USSDDataType = {
  phoneNumber: string
  text: string
  sessionId?: string
  serviceCode?: string
}

export type SMSDataType = {
  to: string[]
  from: string
  message: string
}

export type AmountPerBeneficiaryObj = {
  address: string
  amount: number
}
