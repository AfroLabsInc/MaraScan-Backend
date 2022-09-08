import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.group(() => {
      Route.post('register', 'BeneficiaryAuthsController.register')
      Route.post('login', 'BeneficiaryAuthsController.login')
    }).prefix('beneficiaries')

    Route.group(() => {
      Route.post('register', 'DonorAuthsController.register')
      Route.post('login', 'DonorAuthsController.login')
    }).prefix('donors')

    Route.group(() => {
      Route.post('login', 'AdminAuthsController.login')
    }).prefix('admin')
  }).prefix('auth')
}
