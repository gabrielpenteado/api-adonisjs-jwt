import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async store({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    // console.log(user)

    const token = await User.accessTokens.create(user)
    // response.redirect('/api')
    return token
  }
}
