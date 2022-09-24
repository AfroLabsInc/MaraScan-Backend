import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.resource('donors', 'DonorsController').apiOnly().middleware({ update: 'auth:donorApi' })

    Route.get('donors/address/:account_address', 'DonorsController.showByAddress')

    Route.group(() => {
      Route.resource('donors.profiles', 'DonorProfilesController').apiOnly()
      Route.post('donors/:donor_id/kyc', 'DonorKycsController.store')

      Route.get('circle/public-key', 'CircleCardPaymentsController.getPublicKey')
      Route.post('donors/:donor_id/cards', 'CircleCardPaymentsController.addNewCard')
      Route.get('donors/:donor_id/cards', 'CircleCardPaymentsController.getDonorCards')

      Route.resource('donors.donationRequests', 'DonationRequestsController').apiOnly()

      Route.post('donationRequests/:donationRequest_id/pay', 'CircleCardPaymentsController.pay')
    }).middleware('auth:donorApi')
  })
}
