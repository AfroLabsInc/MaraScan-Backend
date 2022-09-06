import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.group(() => {
      Route.resource('categories', 'BeneficiaryCategoriesController').apiOnly()
    })
  })
    .prefix('admin')
    .middleware('auth:adminApi')
}
