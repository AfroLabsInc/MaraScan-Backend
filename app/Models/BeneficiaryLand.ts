import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Beneficiary from './Beneficiary'
import Image from './Image'

export default class BeneficiaryLand extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public beneficiaryId: number

  @column()
  public titleDeedIdentification: string

  @column()
  public titleDeedImageId: number

  @column()
  public numOfAcres: number

  @belongsTo(() => Beneficiary, {
    foreignKey: 'beneficiaryId',
  })
  public beneficiary: BelongsTo<typeof Beneficiary>

  @belongsTo(() => Image, {
    foreignKey: 'titleDeedImageId',
  })
  public titleDeedImage: BelongsTo<typeof Image>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
