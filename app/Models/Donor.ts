import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import OrganizationDonorProfile from './OrganizationDonorProfile'
import IndividualDonorProfile from './IndividualDonorProfile'
import DonorKyc from './DonorKyc'
import Hash from '@ioc:Adonis/Core/Hash'
import { encryptText } from 'App/Utils'

export default class Donor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public accountAddress: string

  @column()
  public donorType: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public encryptedPassword: string

  @hasOne(() => DonorKyc, {
    foreignKey: 'donorId',
  })
  public kyc: HasOne<typeof DonorKyc>

  @hasOne(() => OrganizationDonorProfile, {
    foreignKey: 'donorId',
  })
  public organizationProfile: HasOne<typeof OrganizationDonorProfile>

  @hasOne(() => IndividualDonorProfile, {
    foreignKey: 'donorId',
  })
  public individualProfile: HasOne<typeof IndividualDonorProfile>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(donor: Donor) {
    if (donor.$dirty.password) {
      donor.encryptedPassword = await encryptText(donor.password)
      donor.password = await Hash.make(donor.password)
    }
  }
}
