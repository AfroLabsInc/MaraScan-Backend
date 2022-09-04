import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'donorKycs'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('idCardFrontImageId')
        .unsigned()
        .references('id')
        .inTable('images')
        .onDelete('CASCADE')

      table
        .integer('idCardBackImageId')
        .unsigned()
        .references('id')
        .inTable('images')
        .onDelete('CASCADE')

      table.integer('photoId').unsigned().references('id').inTable('images').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns('photoId', 'idCardFrontImageId', 'idCardBackImageId')
    })
  }
}
