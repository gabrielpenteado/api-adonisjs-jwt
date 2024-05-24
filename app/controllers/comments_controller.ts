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

  async update({ request, response, params, auth }: HttpContext) {
    const body = request.body()

    const userId = auth.user?.id
    const comment = await Comment.findOrFail(params.id)

    if (userId !== comment.userId) {
      return { msg: 'errorrr' }
    }

    comment.text = body.text

    await comment.save()

    response.status(201)

    return {
      message: 'Comment succesfully updated.',
      data: comment,
    }
  }

  async store({ request, response, params, auth }: HttpContext) {
    const body = request.body()
    const momentId = params.moment_id

    const userId = auth.user?.id
    body.userId = userId

    await Moment.findOrFail(momentId)
    body.momentId = momentId

    const comment = await Comment.create(body)

    response.status(201)

    return {
      message: 'Comment succesfully updated/created.',
      data: comment,
    }
  }

  async destroy({ params, auth, response }: HttpContext) {
    const comment = await Comment.findOrFail(params.id)

    const userId = auth.user?.id

    if (userId !== comment.userId) {
      response.status(401)
      return {
        message: 'You can not delete this comment!',
      }
    }

    await comment.delete()

    return {
      msg: 'Coomment successfully deleted!',
      data: comment,
    }
  }
}
