import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'beneficiaryCategories'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('coverImageId')
        .unsigned()
        .references('id')
        .inTable('images')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('coverImageId')
    })
  }
}
