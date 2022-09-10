import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.any('notifications/receiver', 'CirclesController.notificationReceiver')
  }).prefix('circle')
}
