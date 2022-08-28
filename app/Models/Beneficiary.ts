import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import BeneficiaryCategory from './BeneficiaryCategory'
import BeneficiaryKyc from './BeneficiaryKyc'
import UssdUser from './UssdUser'

export default class Beneficiary extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public categoryId: number

  @column()
  public accountAddress: string

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public mobile: string

  @column()
  public email: string

  @column()
  public country: string

  @column()
  public region: string

  @column()
  public address: string

  @belongsTo(() => BeneficiaryCategory, {
    foreignKey: 'categoryId',
  })
  public category: BelongsTo<typeof BeneficiaryCategory>

  @hasOne(() => BeneficiaryKyc, {
    foreignKey: 'beneficiaryId',
  })
  public kyc: HasOne<typeof BeneficiaryKyc>

  @hasOne(() => UssdUser, {
    foreignKey: 'beneficiaryId',
  })
  public ussdUser: HasOne<typeof UssdUser>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
