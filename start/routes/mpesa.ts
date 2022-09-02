import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.group(() => {
      Route.any('queue', 'MpesaIntegrationsController.accountBalanceQueueHandler')

      Route.any('result', 'MpesaIntegrationsController.accountBalanceResultHandler')
    }).prefix('account-balance')

    Route.group(() => {
      Route.any('queue', 'MpesaIntegrationsController.b2cQueueHandler')

      Route.any('result', 'MpesaIntegrationsController.b2cResultHandler')
    }).prefix('business-to-customer')
  }).prefix('mpesa/callbacks')
}
