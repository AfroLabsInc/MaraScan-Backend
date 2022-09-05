import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Beneficiary from 'App/Models/Beneficiary'

export default class BeneficiaryAuth {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    if (!auth.use('beneficiaryApi').isAuthenticated) {
      response.unauthorized({ error: 'Unauthorized access, Must be a beneficiary' })

      return
    }

    await next()
  }
}
