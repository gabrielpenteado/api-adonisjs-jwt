import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
// import User from './user.js'
import Comment from './comment.js'

export default class Moment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  @column()
  declare userId: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare image: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // @belongsTo(() => User)
  // declare user: BelongsTo<typeof User>
}
