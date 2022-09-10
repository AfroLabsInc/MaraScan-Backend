import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.any('notifications/listener', 'CirclesController.notificationListener')
  }).prefix('circle')
}
