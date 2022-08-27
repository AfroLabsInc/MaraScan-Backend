import { USSDDataType } from 'App/Types'
import Beneficiary from 'App/Models/Beneficiary'
import { extractText } from 'App/Utils'
import BeneficiaryKyc from 'App/Models/BeneficiaryKyc'

export default class USSDService {
  public static async entry(data: USSDDataType) {
    const beneficiary = await Beneficiary.findBy('mobile', data.phoneNumber)

    if (!beneficiary) {
      return `CON Welcome to MaraScan. Reply with
        1. Register
        2. Change Language
        3. Help and Support
      `
    } else {
      return `CON Welcome back ${beneficiary.firstName}, reply with?
        1. Manage Account
        2. Change Language
        3. Help and Support
      `
    }
  }
  public static async continuation(data: USSDDataType) {
    const beneficiary = await Beneficiary.findBy('mobile', data.phoneNumber)
    const level = extractText(data.text).length
    const textArray = extractText(data.text)

    let response

    if (!beneficiary) {
      if (textArray[0] === '1') {
        response = await this.register(data, textArray, level)
      } else if (textArray[0] === '2') {
        response = await this.changeLanguage(data)
      } else if (textArray[0] === '3') {
        response = await this.support(data)
      }
    } else {
      if (textArray[0] === '1') {
        response = await this.manageAccount(data, textArray, level)
      } else if (textArray[0] === '2') {
        response = await this.changeLanguage(data)
      } else if (textArray[0] === '3') {
        response = await this.support(data)
      }
    }

    return response
  }
  private static async register(data: USSDDataType, textArray, level) {
    let response

    if (level === 1) {
      response = `CON Enter your first name`
    } else if (level === 2) {
      response = `CON Enter your last name (surname)`
    } else if (level === 3) {
      response = `CON Enter your country`
    } else if (level === 4) {
      response = `CON Enter your region`
    } else if (level === 5) {
      response = `CON Enter your address`
    } else if (level === 6) {
      response = `CON Enter your Kenya ID Number`
    } else if (level === 7) {
      response = `CON Thanks for Completing the form
        1. Confirm Reg.
        2. Cancel
      `
    } else if (level === 8) {
      if (textArray[7] === '1') {
        // TODO: Create an Ethereum Account for the user

        // create a record for the beneficiary
        await Beneficiary.create({
          firstName: textArray[1],
          lastName: textArray[2],
          mobile: data.phoneNumber,
          country: textArray[3],
          region: textArray[4],
          address: textArray[5],
        })

        // submit/create a KYC record for them
        await BeneficiaryKyc.create({ identificationNumber: textArray[6] })

        response = `END Congratulations, your details have been submitted and will be reviewd by our Admins`
      } else if (textArray[7] === '2') {
        response = `END We're sorry that you couldn't proceed with the registration.
          We hope to have you again soon.
        `
      }
    }

    return response
  }
  private static manageAccount(data: USSDDataType, textArray, level) {
    let response
    if (level === 1) {
      response = `CON WHat would you like to check?
        1. Account balance
        2. Transfer money
        3. Withdraw to M-Pesa
        4. View Transaction History
      `
    } else if (level === 2) {
      if (textArray[1] === '1') {
        // TODO: Get and Process Account Balance
        response = `END Your Account Balance is 3000 KES`
      } else if (textArray[1] === '2') {
        // TODO: Handle Transfer Logic
        response = ``
      } else if (textArray[1] === '3') {
        response = ``
      } else if (textArray[1] === '4') {
        response = ``
      }
    }

    return response
  }
  private static changeLanguage(data: USSDDataType) {}
  private static support(data: USSDDataType) {}
}
