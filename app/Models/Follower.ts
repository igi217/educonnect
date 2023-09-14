import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Follower extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public followerId: number

  @column()
  public followingId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'id',
    localKey: 'followerId'
  })
  public follower: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'id',
    localKey: 'followingId'
  })
  public following: BelongsTo<typeof User>
}
