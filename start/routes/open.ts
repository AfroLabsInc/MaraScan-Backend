import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.get('conservancies', 'ConservanciesController.index')

    Route.resource('conservancies.categories', 'BeneficiaryCategoriesController').apiOnly()
  })
}
