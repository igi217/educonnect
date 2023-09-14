import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, computed, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import UserTopic from './UserTopic'
import Follower from './Follower'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public university: string

  @column()
  public department: string

  @column()
  public firstName: string

  @column()
  public lastName: string

  @computed()
  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  @column()
  public country: string

  @column()
  public emailVerified: boolean = true

  @column()
  public avatar: string

  @column()
  public status: boolean = true

  @column()
  public coverImage: string

  @column()
  public github: string

  @column()
  public facebook: string

  @column()
  public twitter: string

  @column()
  public bio: string

  @column()
  public linkedin: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }


  @hasMany(() => UserTopic)
  public userTopic: HasMany<typeof UserTopic>

  @computed()
  public get userName() {
    return `${this.firstName?.toLowerCase()}.${this.lastName?.toLowerCase()}.${this.id}`
  }

  @hasMany(() => Follower, {
    foreignKey: "followerId"
  })
  public followings: HasMany<typeof Follower>

  @hasMany(() => Follower, {
    foreignKey: "followingId"
  })

  public followers: HasMany<typeof Follower>


}
