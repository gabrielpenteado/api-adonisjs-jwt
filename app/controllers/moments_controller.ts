import Moment from '#models/moment'
import type { HttpContext } from '@adonisjs/core/http'

import { v4 as uuidv4 } from 'uuid'
import app from '@adonisjs/core/services/app'

export default class MomentsController {
  private validationOptions = {
    types: ['image'],
    size: '2mb',
  }

  async index() {
    // const moments = await Moment.all() // return all moments
    // const moments = await Moment.query() // is the same of above, return all moments
    const moments = await Moment.query().preload('comments') // return all moments plus the comments of each one

    return {
      data: moments,
    }
  }

  async show({ params }: HttpContext) {
    const moment = await Moment.findOrFail(params.id)

    await moment.load('comments')

    return {
      data: moment,
    }
  }

  async store({ request, response }: HttpContext) {
    const body = request.body()

    const image = request.file('image', this.validationOptions)

    if (image) {
      const imageName = `${uuidv4()}.${image.extname}`

      await image.move(app.tmpPath('uploads'), { name: imageName })

      body.image = imageName
    }

    const moment = await Moment.create(body)

    response.status(201)

    return {
      message: 'Moment successfully created!',
      data: moment,
    }
  }

  async destroy({ params }: HttpContext) {
    const moment = await Moment.findOrFail(params.id)

    await moment.delete()

    return {
      msg: 'Moment successfully deleted!',
      data: moment,
    }
  }

  async update({ request, params }: HttpContext) {
    const body = request.body()

    const moment = await Moment.findOrFail(params.id)

    moment.title = body.title
    moment.description = body.description

    if (moment.image !== body.image || !moment.image) {
      const image = request.file('image', this.validationOptions)

      if (image) {
        const imageName = `${uuidv4()}.${image.extname}`

        await image.move(app.tmpPath('uploads'), { name: imageName })

        moment.image = imageName
      }
    }

    await moment.save()

    return {
      msn: 'Moment successfully updated!',
      body: moment,
    }
  }
}
