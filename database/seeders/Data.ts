import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import BeneficiaryCategory from 'App/Models/BeneficiaryCategory'
import Conservancy from 'App/Models/Conservancy'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const conservancy = await Conservancy.updateOrCreate(
      { email: 'marasiana@gmail.com' },
      {
        email: 'marasiana@gmail.com',
        password: '12345',
        name: 'Mara Siana Conservancy',
        description: 'The Most Beautiful Conservancy of the Masai People',
        registrationIdentification: 'MS2022',
      }
    )
    await BeneficiaryCategory.updateOrCreateMany('title', [
      { title: 'Land Owners', description: 'people who own lands', conservancyId: conservancy.id },
      {
        title: 'Artisan Women',
        description: 'Women who are skilled in different crafts',
        conservancyId: conservancy.id,
      },
    ])
  }
}
