import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import DonationRequest from './DonationRequest'

export default class Disbursement extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public donationRequestId: number

  @belongsTo(() => DonationRequest, {
    foreignKey: 'beneficiaryId',
  })
  public beneficiary: BelongsTo<typeof DonationRequest>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
