import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Notification extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public text: string

  @column()
  public userId: number

  @column()
  public link: string

  @column()
  public seen: boolean = false;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
