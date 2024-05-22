import Comment from '#models/comment'
import Moment from '#models/moment'
import type { HttpContext } from '@adonisjs/core/http'

export default class CommentsController {
  async index() {
    const comments = await Comment.all()

    return {
      data: comments,
    }
  }

  async show({ params }: HttpContext) {
    const comment = await Comment.findOrFail(params.id)

    return {
      data: comment,
    }
  }

  async update({ request, response, params }: HttpContext) {
    const body = request.body()
    const momentId = params.id

    await Moment.findOrFail(momentId)
    body.momentId = momentId

    const comment = await Comment.create(body)

    response.status(201)

    return {
      message: 'Comment succesfully created or updated.',
      data: comment,
    }
  }
}
