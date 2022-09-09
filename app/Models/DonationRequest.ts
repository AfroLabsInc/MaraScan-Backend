import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Donor from './Donor'

export default class DonationRequest extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public donorId: number

  @column({ prepare: (value) => (value ? JSON.stringify(value) : value) })
  public categoryIds: number[]

  @column()
  public paymentMethod: string

  @column({ prepare: (value) => (value ? JSON.stringify(value) : value) })
  public amount: object

  @column()
  public note: string

  @column()
  public paymentStatus: string

  @belongsTo(() => Donor, {
    foreignKey: 'donorId',
  })
  public donor: BelongsTo<typeof Donor>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
