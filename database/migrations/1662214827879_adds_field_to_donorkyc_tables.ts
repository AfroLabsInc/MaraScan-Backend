import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'donorKYCs'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('idCardImageId')
        .unsigned()
        .references('id')
        .inTable('images')
        .onDelete('CASCADE')

      table.integer('photoId').unsigned().references('id').inTable('images').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns('photoId', 'idCardImageId')
    })
  }
}
