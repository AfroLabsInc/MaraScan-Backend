import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Admin from 'App/Models/Admin'
import Env from '@ioc:Adonis/Core/Env'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Admin.updateOrCreate(
      { email: Env.get('SUPER_ADMIN_EMAIL') },
      {
        name: 'Super Admin',
        email: Env.get('SUPER_ADMIN_EMAIL'),
        password: Env.get('SUPER_ADMIN_PASSWORD'),
        role: 'super-admin',
        isSuperAdmin: true,
      }
    )
  }
}
