import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'beneficiaryKycs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('beneficiaryId')
        .unsigned()
        .references('id')
        .inTable('beneficiaries')
        .onDelete('CASCADE')

      table.text('identificationNumber')

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
