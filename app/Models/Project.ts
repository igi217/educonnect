import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Topic from './Topic'
import User from './User'
import ProjectImage from './ProjectImage'
import ProjectUpvote from './ProjectUpvote'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public topicId: number

  @column()
  public slug: string

  @column()
  public title: string

  @column()
  public content: string

  @column()
  public image: string

  @column()
  public github: string

  @belongsTo(() => Topic)
  public topic: BelongsTo<typeof Topic>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => ProjectImage)
  public files: HasMany<typeof ProjectImage>

  @hasMany(() => ProjectUpvote)
  public upvotes: HasMany<typeof ProjectUpvote>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
