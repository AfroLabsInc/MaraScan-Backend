import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.resource('donors', 'DonorsController').apiOnly()
  })
}
