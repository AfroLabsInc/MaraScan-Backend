import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.resource('donors', 'DonorsController').apiOnly()

    Route.get('donors/address/:account_address', 'DonorsController.showByAddress')

    Route.resource('donors.profiles', 'DonorProfilesController').apiOnly()

    Route.post('donors/:donor_id/kyc', 'DonorKycsController.store')
  })
}
