import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'donorKycs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('donorId').unsigned().references('id').inTable('donors').onDelete('CASCADE')

      table.enum('donorType', ['individual', 'organization'])

      table.text('organizationIdentificationNumber')

      table.enum('status', ['pending', 'approved', 'declined']).defaultTo('pending')

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
