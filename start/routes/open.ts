import Route from '@ioc:Adonis/Core/Route'

export default () => {
  Route.group(() => {
    Route.get('conservancies', 'ConservanciesController.index')

    Route.get('conservancies/:conservancy_id/categories', 'BeneficiaryCategoriesController.index')
  })
}
