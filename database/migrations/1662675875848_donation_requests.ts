import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'donationRequests'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('donorId').unsigned().references('id').inTable('donors').onDelete('CASCADE')

      table.json('categoryIds')

      table.string('paymentMethod') // ['crypto', 'fiat']

      table.json('amount')

      table.text('note')

      table.enum('paymentStatus', ['paid', 'not-paid']).defaultTo('not-paid')

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
