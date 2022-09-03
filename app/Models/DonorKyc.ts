import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Donor from './Donor'
import Image from './Image'

export default class DonorKyc extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public donorId: number

  @column()
  public donorType: string

  @column()
  public organizationIdentificationNumber: string

  @column()
  public idCardImageId: number

  @column()
  public photoId: number

  @column()
  public status: string

  @belongsTo(() => Donor, {
    foreignKey: 'donorId',
  })
  public donor: BelongsTo<typeof Donor>

  @belongsTo(() => Image, {
    foreignKey: 'idCardImageId',
  })
  public idCard: BelongsTo<typeof Image>

  @belongsTo(() => Image, {
    foreignKey: 'photoId',
  })
  public photo: BelongsTo<typeof Image>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
