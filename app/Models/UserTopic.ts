import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Topic from './Topic'

export default class UserTopic extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public topicId: number

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Topic)
  public topic: BelongsTo<typeof Topic>
}
