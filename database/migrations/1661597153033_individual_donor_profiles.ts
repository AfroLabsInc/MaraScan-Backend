import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'individualDonorProfiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('donorId').unsigned().references('id').inTable('donors').onDelete('CASCADE')

      table.string('firstName')

      table.string('lastName')

      table.string('email')

      table.string('country')

      table.string('region')

      table.text('address')

      table.string('occupation')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('createdAt', { useTz: true })
      table.timestamp('updatedAt', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
