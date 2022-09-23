import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Beneficiary from './Beneficiary'
import Image from './Image'
import Conservancy from './Conservancy'

export default class BeneficiaryCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public coverImageId: number

  @column()
  public conservancyId: number

  @hasMany(() => Beneficiary, {
    foreignKey: 'categoryId',
  })
  public beneficiaries: HasMany<typeof Beneficiary>

  @belongsTo(() => Image, {
    foreignKey: 'coverImageId',
  })
  public coverImage: BelongsTo<typeof Image>

  @belongsTo(() => Conservancy, {
    foreignKey: 'conservancyId',
  })
  public conservancy: BelongsTo<typeof Conservancy>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
