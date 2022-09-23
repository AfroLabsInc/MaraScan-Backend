import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'beneficiaries'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('conservancyId')
        .unsigned()
        .references('id')
        .inTable('conservancies')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('conservancyId')
    })
  }
}
