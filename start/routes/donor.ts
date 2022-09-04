import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.resource('donors', 'DonorsController').apiOnly()

    Route.resource('donors.profiles', 'DonorProfilesController').apiOnly()

    Route.post('donors/:donor_id/kyc', 'DonorKycsController.store')
  })
}
