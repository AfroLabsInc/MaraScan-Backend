import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.resource('beneficiaries', 'BeneficiariesController').apiOnly()

    Route.get('beneficiaries/address/:account_address', 'BeneficiariesController.showByAddress')

    Route.post('beneficiaries/:beneficiary_id/kyc', 'DonorKycsController.store')
  })
}
