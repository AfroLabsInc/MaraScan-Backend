import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.any('queue', 'MpesaIntegrationsController.queueHandler')

    Route.any('result', 'MpesaIntegrationsController.resultHandler')
  }).prefix('mpesa/callback')
}
