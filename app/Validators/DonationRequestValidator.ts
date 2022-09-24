import { validator, schema } from '@ioc:Adonis/Core/Validator'
import messages from './ValidatorErrorMessages'

class DonationRequestValidator {
  public store(payload) {
    return validator.validate({
      schema: schema.create({
        paymentMethod: schema.enum(['crypto', 'fiat']),
        conservancyId: schema.number(),
        categoryIds: schema.array().members(schema.number()),
        amount: schema.object().members({
          currency: schema.string(),
          amount: schema.number(),
        }),
        note: schema.string.optional(),
      }),
      data: payload,
      messages,
    })
  }
  public update(payload) {
    return validator.validate({
      schema: schema.create({
        paymentMethod: schema.enum.optional(['crypto', 'fiat']),
        conservancyId: schema.number(),
        categoryIds: schema.array.optional().members(schema.number()),
        amount: schema.object.optional().members({
          currency: schema.string(),
          amount: schema.number(),
        }),
        note: schema.string.optional(),
      }),
      data: payload,
      messages,
    })
  }
}

export default new DonationRequestValidator()
