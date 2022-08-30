import Cryptr from 'cryptr'
import Env from '@ioc:Adonis/Core/Env'

export const extractText = (text: string) => {
  return text.split('*')
}

export const encryptText = (text: string) => {
  const cryptr = new Cryptr(Env.get('ENCRYPTION_SECRET'))

  const encryptedString = cryptr.encrypt(text)

  return encryptedString
}

export const decryptText = (encryptedString: string) => {
  const cryptr = new Cryptr(Env.get('ENCRYPTION_SECRET'))

  const decryptedString = cryptr.decrypt(encryptedString)

  return decryptedString
}
