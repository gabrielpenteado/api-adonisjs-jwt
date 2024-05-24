import User from '#models/user'

import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index() {
    const users = await User.query().preload('moments').preload('comments') // return all users including comments and moments

    return {
      data: users,
    }
  }

  async show({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)

    await user.load('moments')
    await user.load('comments')

    return {
      data: user,
    }
  }

  async store({ request, response }: HttpContext) {
    const fullName = request.input('username')
    const email = request.input('email')
    const password = request.input('password')

    const user = { fullName, email, password }

    await User.create(user)

    response.status(201)

    return {
      message: 'User successfully created!',
      data: user,
    }
  }

  async destroy({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)

    await user.delete()

    return {
      msg: 'Moment successfully deleted!',
      data: user,
    }
  }
}
