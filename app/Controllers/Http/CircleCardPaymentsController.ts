import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CircleCardPaymentsController {
  public async payWithNewCard({}: HttpContextContract) {}

  public async payWithSavedCard({}: HttpContextContract) {}
}
