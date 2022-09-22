import Cryptr from 'cryptr'
import Env from '@ioc:Adonis/Core/Env'
import CustomException from 'App/Exceptions/CustomException'
import cc from 'currency-converter-lt'

import axios from 'axios'

export const axiosClient = (
  baseUrl: string,
  authorization: string = '',
  contentType: string = 'application/json'
) =>
  axios.create({
    baseURL: baseUrl,
    headers: {
      'Authorization': authorization,
      'Content-Type': contentType,
    },
  })

export const errorHandler = (error: any) => {
  // console.log(error.response)
  throw new CustomException(
    error?.response?.statusText ?? error.message ?? 'Unknown',
    error?.response?.status ?? error.status ?? 400
  )
}

export const extractText = (text: string) => {
  return text.split('*')
}

export const encryptText = (text: string) => {
  const cryptr = new Cryptr(Env.get('ENCRYPTION_SECRET'))

  const encryptedString = cryptr.encrypt(text)

  return encryptedString
}

export const decryptText = (encryptedString: string): string => {
  const cryptr = new Cryptr(Env.get('ENCRYPTION_SECRET'))

  const decryptedString = cryptr.decrypt(encryptedString)

  return decryptedString
}

export const convertFiatCurrencies = async (from: string, to: string, amount: number) => {
  // convert the currency
  let currencyConverter = new cc({
    from: from,
    to: to,
    amount: amount,
  })
  const converted = await currencyConverter.convert()

  return converted
}
