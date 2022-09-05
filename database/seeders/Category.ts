import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import BeneficiaryCategory from 'App/Models/BeneficiaryCategory'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await BeneficiaryCategory.updateOrCreateMany('title', [
      { title: 'Land Owners', description: 'people who own lands' },
      { title: 'Service Renderers', description: 'people who render services' },
      { title: 'Safari Guards', description: 'people who take care of the researve' },
    ])
  }
}
