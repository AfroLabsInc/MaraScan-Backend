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

      table.json('amountPerBeneficiary')

      table.text('note')

      table.enum('paymentStatus', ['paid', 'pending', 'failed']).defaultTo('pending')

      table.boolean('isDisbursed').defaultTo(false)

      table.float('disbursedAmount').defaultTo(0.0)

      table.string('paymentId')

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
