import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'conservancies'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('email').unique()

      table.string('password')

      table.text('ethereumAccountAddress').unique().notNullable()

      table.text('ethereumAccountPrivateKey').unique().notNullable()

      table.string('name')

      table.text('description')

      table.string('registrationIdentification')

      table
        .integer('coverImageId')
        .unsigned()
        .references('id')
        .inTable('images')
        .onDelete('CASCADE')

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
