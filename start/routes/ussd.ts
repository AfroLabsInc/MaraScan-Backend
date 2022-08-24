import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.post('callback', 'UssdIntegrationsController.handler')
  }).prefix('ussd')
}
