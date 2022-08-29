import { USSDDataType } from 'App/Types'
import Beneficiary from 'App/Models/Beneficiary'
import { extractText } from 'App/Utils'
import BeneficiaryKyc from 'App/Models/BeneficiaryKyc'
import UssdUser from 'App/Models/UssdUser'

const content = {
  english: {
    welcomeMsg: 'Welcome to MaraScan. Reply with',
    welcomeBack: 'Welcome back',
    register: 'Register',
    changeLang: 'Change Language',
    support: 'Help and Support',
    selectLang: 'Select a Language, reply with',
    firstName: 'Enter your first name',
    lastName: 'Enter your last name (surname)',
    country: 'Enter your country',
    region: 'Enter your region',
    address: 'Enter your address',
    kId: 'Enter your Kenya ID Number',
    formComplete: 'Thanks for Completing the form, reply with',
    registerDone:
      'Congratulations, your details have been submitted and will be reviewd by our Admins',
    registerCancel:
      "We're sorry that you couldn't proceed with the registration. We hope to have you again soon.",
    manageAccMenu: 'What would you like to check?',
    accBal: 'Account balance',
    transferMoney: 'Transfer money',
    withdrawToMpesa: 'Withdraw to M-Pesa',
    viewHistory: 'View Transaction History',
  },
  swahili: {
    welcomeMsg: 'Karibu MaraScan. Jibu na',
    welcomeBack: 'Karibu tena',
    register: 'Sajili',
    changeLang: 'Badilisha Lugha',
    support: 'Msaada na Usaidizi',
    selectLang: 'Chagua Lugha, jibu na',
    firstName: 'Ingiza jina lako la kwanza',
    lastName: 'Andika jina lako la mwisho (jina la ukoo)',
    country: 'Ingiza nchi yako',
    region: 'Ingiza eneo lako',
    address: 'Weka anwani yako',
    kId: 'Weka Nambari yako ya Kitambulisho cha Kenya',
    formComplete: 'Asante kwa Kujaza fomu, jibu na',
    registerDone: 'Hongera, maelezo yako yamewasilishwa na yatakaguliwa na Wasimamizi wetu',
    registerCancel:
      'Tunasikitika kwamba hukuweza kuendelea na usajili. Tunatumai kuwa nawe tena hivi karibuni.',
    manageAccMenu: 'Je, ungependa kuangalia nini?',
    accBal: 'Salio la akaunti',
    transferMoney: 'Kuhamisha fedha',
    withdrawToMpesa: 'Toa pesa kwa M-Pesa',
    viewHistory: 'Tazama Historia ya Muamala',
  },
}

export default class USSDService {
  public static async entry(data: USSDDataType) {
    const ussdUser = await UssdUser.updateOrCreate(
      { mobile: data.phoneNumber },
      { mobile: data.phoneNumber, lastSessionId: data.sessionId }
    )
    const beneficiary = await Beneficiary.findBy('mobile', data.phoneNumber)
    let response

    if (!beneficiary) {
      response = `CON ${content[ussdUser.language].welcomeMsg}
        1. ${content[ussdUser.language].register}
        2. ${content[ussdUser.language].changeLang}
        3. ${content[ussdUser.language].support}
      `
    } else {
      response = `CON ${content[ussdUser.language].welcomeBack} ${beneficiary.firstName}, reply with
        1. ${content[ussdUser.language].manageAcc}
        2. ${content[ussdUser.language].changeLang}
        3. ${content[ussdUser.language].support}
      `
    }
    return response
  }
  public static async continuation(data: USSDDataType) {
    const ussdUser = await UssdUser.updateOrCreate(
      { mobile: data.phoneNumber },
      { mobile: data.phoneNumber, lastSessionId: data.sessionId }
    )
    const beneficiary = await Beneficiary.findBy('mobile', data.phoneNumber)
    const level = extractText(data.text).length
    const textArray = extractText(data.text)

    let response

    if (!beneficiary) {
      if (textArray[0] === '1') {
        response = await this.register(data, textArray, level, ussdUser)
      } else if (textArray[0] === '2') {
        response = await this.changeLanguage(textArray, level, ussdUser)
      } else if (textArray[0] === '3') {
        response = await this.support(data)
      }
    } else {
      if (textArray[0] === '1') {
        response = await this.manageAccount(data, textArray, level, ussdUser)
      } else if (textArray[0] === '2') {
        response = await this.changeLanguage(textArray, level, ussdUser)
      } else if (textArray[0] === '3') {
        response = await this.support(data)
      }
    }

    return response
  }
  private static async register(data: USSDDataType, textArray, level, ussdUser: UssdUser) {
    let response

    if (level === 1) {
      response = `CON ${content[ussdUser.language].firstName}`
    } else if (level === 2) {
      response = `CON ${content[ussdUser.language].lastName}`
    } else if (level === 3) {
      response = `CON ${content[ussdUser.language].country}`
    } else if (level === 4) {
      response = `CON ${content[ussdUser.language].region}`
    } else if (level === 5) {
      response = `CON ${content[ussdUser.language].address}`
    } else if (level === 6) {
      response = `CON ${content[ussdUser.language].kId}`
    } else if (level === 7) {
      response = `CON ${content[ussdUser.language].formComplete}
        1. Confirm Registration.
        2. Cancel Registration.
      `
    } else if (level === 8) {
      if (textArray[7] === '1') {
        // TODO: Create an Ethereum Account for the user

        // create a record for the beneficiary
        const beneficiary = await Beneficiary.create({
          accountAddress: `0x2222${
            Math.random().toString(36).substring(2, 5) +
            Math.random().toString(36).substring(2, 5) +
            Date.now()
          }`,
          firstName: textArray[1],
          lastName: textArray[2],
          mobile: data.phoneNumber,
          country: textArray[3],
          region: textArray[4],
          address: textArray[5],
        })

        // submit/create a KYC record for them
        await BeneficiaryKyc.create({
          identificationNumber: textArray[6],
          beneficiaryId: beneficiary.id,
        })

        response = `END ${content[ussdUser.language].registerDone}`
      } else if (textArray[7] === '2') {
        response = `END ${content[ussdUser.language].registerCancel}
        `
      }
    }

    return response
  }
  private static manageAccount(data: USSDDataType, textArray, level, ussdUser: UssdUser) {
    let response
    if (level === 1) {
      response = `CON ${content[ussdUser.language].manageAccMenu}
        1. ${content[ussdUser.language].accBal}
        2. ${content[ussdUser.language].transferMoney}
        3. ${content[ussdUser.language].withdrawToMpesa}
        4. ${content[ussdUser.language].viewHistory}
      `
    } else if (level === 2) {
      if (textArray[1] === '1') {
        // TODO: Get and Process Account Balance
        response = `END Your Account Balance is 3000 KES`
      } else if (textArray[1] === '2') {
        // TODO: Handle Transfer Logic
        response = ``
      } else if (textArray[1] === '3') {
        // TODO: Handle Withdrawal Logic
        response = `END Money withdrawn to ${data.phoneNumber}`
      } else if (textArray[1] === '4') {
        response = ``
      }
    }

    return response
  }
  private static async changeLanguage(textArray, level, ussdUser: UssdUser) {
    let response

    if (level === 1) {
      response = `CON  ${content[ussdUser.language].selectLang}
        1. English
        2. Swahili
      `
    } else if (level === 2) {
      if (textArray[1] === '1') {
        ussdUser.language = 'english'
        await ussdUser.save()

        response = `END You have successfully Changed Your Language`
      } else if (textArray[1] === '2') {
        ussdUser.language = 'swahili'
        await ussdUser.save()

        response = `END You have successfully Changed Your Language`
      }
    }
    return response
  }
  private static async support(data: USSDDataType) {
    const beneficiary = await Beneficiary.findBy('mobile', data.phoneNumber)
    let response

    if (beneficiary) {
      response = `END Thank you ${beneficiary.firstName} for reaching out to our Support, kindly dial - 090222222 or visit www.help.marascan.com`
    } else {
      response = `END Thank you for reaching out to our Support, kindly dial - 090222222 or visit www.help.marascan.com`
    }
    return response
  }
}
