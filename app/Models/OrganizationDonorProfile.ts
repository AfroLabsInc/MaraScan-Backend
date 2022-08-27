import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Donor from './Donor'

export default class OrganizationDonorProfile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public donorId: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public type: string

  @column()
  public email: string

  @column()
  public country: string

  @column()
  public region: string

  @column()
  public addressOne: string

  @column()
  public addressTwo: string

  @belongsTo(() => Donor, {
    foreignKey: 'donorId',
  })
  public donor: BelongsTo<typeof Donor>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
