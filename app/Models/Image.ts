import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Image extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public thumbnailUrl: string

  @column()
  public url: string

  @column()
  public name: string

  @column()
  public fileType: string

  @column()
  public filePath: string

  @column()
  public height: number

  @column()
  public width: number

  @column()
  public size: number

  @column()
  public fileId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
