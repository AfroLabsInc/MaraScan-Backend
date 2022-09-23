import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Conservancy from 'App/Models/Conservancy'

export default class ConservanciesController {
  public async index({}: HttpContextContract) {
    const conservancies = await Conservancy.query().preload('coverImage')

    return {
      status: 200,
      message: 'Beneficiary Conservancies Fetched Successfully',
      data: conservancies,
    }
  }
}
