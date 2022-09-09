import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.any('notifications/subscriber', 'CirclesController.notificationSubscriber')
  }).prefix('circle')
}
