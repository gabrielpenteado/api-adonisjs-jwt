/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
// import { middleware } from './kernel.js'
const MomentsController = () => import('#controllers/moments_controller')
const CommentsController = () => import('#controllers/comments_controller')

router
  .group(() => {
    router.get('/', () => {
      return { hello: 'world' }
    })

    //router.post('moments', 'moments_controller.store)

    router.resource('/moments', MomentsController).apiOnly()
    // .use(
    //   '*',
    //   middleware.auth({
    //     guards: ['api'],
    //   })
    // )

    router.resource('/comments', CommentsController).apiOnly()
  })
  .prefix('/api')
