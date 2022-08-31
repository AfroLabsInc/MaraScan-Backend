import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Beneficiary from './Beneficiary'

export default class UssdUser extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public beneficiaryId: number

  @column()
  public mobile: string

  @column()
  public language: string

  @column()
  public lastSessionId: string

  @belongsTo(() => Beneficiary, {
    foreignKey: 'beneficiaryId',
  })
  public beneficiary: BelongsTo<typeof Beneficiary>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
