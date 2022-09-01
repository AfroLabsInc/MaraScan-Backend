import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'beneficiaries'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('categoryId')
        .unsigned()
        .references('id')
        .inTable('beneficiaryCategories')
        .onDelete('CASCADE')

      table.text('ethereumAccountAddress').unique().notNullable()

      table.text('ethereumAccountPrivateKey').unique().notNullable()

      table.string('firstName')

      table.string('lastName')

      table.string('mobile').unique().notNullable()

      table.string('email')

      table.string('country')

      table.string('region')

      table.text('address')

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
