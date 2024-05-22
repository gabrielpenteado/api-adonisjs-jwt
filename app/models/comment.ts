import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
// import Moment from './moment.js'
// import type { BelongsTo } from '@adonisjs/lucid/types/relations'
// import User from './user.js'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column()
  declare text: string

  @column()
  declare userId: number

  @column()
  declare momentId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // @belongsTo(() => Moment)
  // declare moment: BelongsTo<typeof Moment>

  // @belongsTo(() => User)
  // declare user: BelongsTo<typeof User>
}
