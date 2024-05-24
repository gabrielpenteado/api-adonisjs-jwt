/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const SessionController = () => import('#controllers/session_controller')
const UsersController = () => import('#controllers/users_controller')
const MomentsController = () => import('#controllers/moments_controller')
const CommentsController = () => import('#controllers/comments_controller')

router
  .group(() => {
    router.get('/', () => {
      return { hello: 'world' }
    })

    router.post('users/session', [SessionController, 'store'])

    router
      .resource('users', UsersController)
      .apiOnly()
      .use(
        ['index', 'show', 'update', 'destroy'],
        middleware.auth({
          guards: ['api'],
        })
      )

    //router.post('moments', 'moments_controller.store')
    router
      .resource('moments', MomentsController)
      .apiOnly()
      .use(
        '*',
        middleware.auth({
          guards: ['api'],
        })
      )

    router
      .resource('moments.comments', CommentsController)
      .apiOnly()
      .use(
        '*',
        middleware.auth({
          guards: ['api'],
        })
      )
  })
  .prefix('/api')
