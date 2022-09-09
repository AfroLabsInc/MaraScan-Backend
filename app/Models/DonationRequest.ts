import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Donor from './Donor'

export default class DonationRequest extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public donorId: number

  @belongsTo(() => Donor, {
    foreignKey: 'donorId',
  })
  public donor: BelongsTo<typeof Donor>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
