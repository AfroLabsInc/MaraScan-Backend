import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.get('beneficiaries/address/:account_address', 'BeneficiariesController.showByAddress')

    Route.group(() => {
      Route.resource('beneficiaries', 'BeneficiariesController').apiOnly()

      Route.resource('beneficiaries.lands', 'BeneficiaryLandsController').apiOnly()

      Route.post('beneficiaries/:beneficiary_id/kyc', 'BeneficiaryKycsController.store')
    }).middleware('auth:beneficiaryApi')
  })
}
