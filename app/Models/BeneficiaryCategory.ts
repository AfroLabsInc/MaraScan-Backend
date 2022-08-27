import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Beneficiary from './Beneficiary'

export default class BeneficiaryCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public coverImageurl: string

  @hasMany(() => Beneficiary, {
    foreignKey: 'categoryId',
  })
  public beneficiaries: HasMany<typeof Beneficiary>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
