import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.post('callback', 'UssdsController.handler')
  }).prefix('ussd')
}
