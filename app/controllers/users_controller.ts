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

  async update({ request, response, params, auth }: HttpContext) {
    const fullName = request.input('username')
    const email = request.input('email')
    const password = request.input('password')

    const user = await User.findOrFail(params.id)
    const userLoggedId = auth.user?.id

    if (userLoggedId !== Number(params.id)) {
      response.status(401)
      return {
        msg: 'You can not update this user!',
      }
    }

    user.fullName = fullName
    user.email = email
    user.password = password

    await user.save()

    return {
      message: 'User successfully updated!',
      data: user,
    }
  }

  async destroy({ params, auth }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const userLoggedId = auth.user?.id

    if (userLoggedId !== Number(params.id)) {
      return {
        msg: "You can't delete this user",
      }
    }

    await user.delete()

    return {
      msg: 'User successfully deleted!',
      data: user,
    }
  }
}
