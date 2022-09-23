import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeSave,
  BelongsTo,
  belongsTo,
  column,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Beneficiary from './Beneficiary'
import Image from './Image'
import Hash from '@ioc:Adonis/Core/Hash'
import BeneficiaryCategory from './BeneficiaryCategory'
import { encryptText } from 'App/Utils'

export default class Conservancy extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public ethereumAccountAddress: string

  @column()
  public ethereumAccountPrivateKey: string

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public registrationIdentification: string

  @column()
  public coverImageId: number

  @belongsTo(() => Image, {
    foreignKey: 'coverImageId',
  })
  public coverImage: BelongsTo<typeof Image>

  @hasMany(() => Beneficiary, {
    foreignKey: 'beneficiaryId',
  })
  public beneficiaries: HasMany<typeof Beneficiary>

  @hasMany(() => BeneficiaryCategory, {
    foreignKey: 'beneficiaryCategoryId',
  })
  public categories: HasMany<typeof BeneficiaryCategory>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async encryptPrivateKey(conservancy: Conservancy) {
    if (conservancy.$dirty.ethereumAccountPrivateKey) {
      conservancy.ethereumAccountPrivateKey = await encryptText(
        conservancy.ethereumAccountPrivateKey
      )
    }
  }

  @beforeSave()
  public static async hashPassword(conservancy: Conservancy) {
    if (conservancy.$dirty.password) {
      conservancy.password = await Hash.make(conservancy.password)
    }
  }
}
