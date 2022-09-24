import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.group(() => {
      Route.post('register', 'BeneficiaryAuthsController.register')
      Route.post('login', 'BeneficiaryAuthsController.login')
      Route.post('logout', 'BeneficiaryAuthsController.logout')
    }).prefix('beneficiaries')

    Route.group(() => {
      Route.post('wallet-register', 'DonorAuthsController.walletRegister')
      Route.post('wallet-login', 'DonorAuthsController.walletLogin')

      Route.post('register', 'DonorAuthsController.register')
      Route.post('login', 'DonorAuthsController.login')

      Route.post('logout', 'DonorAuthsController.logout')
    }).prefix('donors')

    Route.group(() => {
      Route.post('login', 'ConservancyAuthsController.login')
      Route.post('logout', 'ConservancyAuthsController.logout')
    }).prefix('conservancies')

    Route.group(() => {
      Route.post('login', 'AdminAuthsController.login')
      Route.post('logout', 'AdminAuthsController.logout')
    }).prefix('admin')
  }).prefix('auth')
}
