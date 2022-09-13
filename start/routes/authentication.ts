import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.group(() => {
      Route.post('register', 'BeneficiaryAuthsController.register')
      Route.post('login', 'BeneficiaryAuthsController.login')
      Route.post('logout', 'DonorAuthsController.logout')
    }).prefix('beneficiaries')

    Route.group(() => {
      Route.post('wallet', 'DonorAuthsController.walletAuth')
      Route.post('register', 'DonorAuthsController.register')
      Route.post('login', 'DonorAuthsController.login')
      Route.post('logout', 'DonorAuthsController.logout')
    }).prefix('donors')

    Route.group(() => {
      Route.post('login', 'AdminAuthsController.login')
      Route.post('logout', 'DonorAuthsController.logout')
    }).prefix('admin')
  }).prefix('auth')
}
