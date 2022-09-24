import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Donor from './Donor'
import Conservancy from './Conservancy'

type AmountPerBeneficiaryObj = {
  address: string
  amount: number
}
export default class DonationRequest extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public donorId: number

  @column()
  public conservancyId: number

  @column()
  public categoryIds: number[]

  @column()
  public paymentMethod: string

  @column({ prepare: (value) => (value ? JSON.stringify(value) : value) })
  public amount: object

  @column()
  public note: string

  @column()
  public paymentStatus: string

  @column()
  public isDisbursed: boolean

  @column()
  public disbursedAmount: number

  @column()
  public paymentId: string

  @column({ prepare: (value) => (value ? JSON.stringify(value) : value) })
  public amountPerBeneficiary: AmountPerBeneficiaryObj[]

  @belongsTo(() => Conservancy, {
    foreignKey: 'conservancyId',
  })
  public conservancy: BelongsTo<typeof Conservancy>

  @belongsTo(() => Donor, {
    foreignKey: 'donorId',
  })
  public donor: BelongsTo<typeof Donor>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
