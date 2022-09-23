export type USSDDataType = {
  phoneNumber: string
  text: string
  sessionId?: string
  serviceCode?: string
}

export type SMSDataType = {
  username: string
  to: string[]
  from: string
  message: string
}
