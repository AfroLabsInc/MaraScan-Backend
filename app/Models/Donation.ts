import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Donor from './Donor'
import DonationRequest from './DonationRequest'

export default class Donation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public donorId: number

  @column()
  public donationRequestId: number

  @column()
  public isDisbursed: boolean

  @belongsTo(() => Donor, {
    foreignKey: 'donorId',
  })
  public donor: BelongsTo<typeof Donor>

  @belongsTo(() => DonationRequest, {
    foreignKey: 'donationRequestId',
  })
  public donationRequest: BelongsTo<typeof DonationRequest>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
