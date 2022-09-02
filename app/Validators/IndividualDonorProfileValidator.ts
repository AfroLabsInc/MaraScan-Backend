import { validator, schema, rules } from '@ioc:Adonis/Core/Validator'
import messages from './ValidatorErrorMessages'

class IndividualDonorProfileValidator {
  public store(payload) {
    return validator.validate({
      schema: schema.create({
        firstName: schema.string({ trim: true }),
        lastName: schema.string({ trim: true }),
        email: schema.string({ trim: true }, [
          rules.unique({ table: 'individualDonorProfiles', column: 'email' }),
        ]),
        country: schema.string({ trim: true }),
        region: schema.string({ trim: true }),
        address: schema.string({ trim: true }),
        occupation: schema.string({ trim: true }),
      }),
      data: payload,
      messages,
    })
  }
  public update(payload) {
    return validator.validate({
      schema: schema.create({
        firstName: schema.string.optional({ trim: true }),
        lastName: schema.string.optional({ trim: true }),
        email: schema.string.optional({ trim: true }, [
          rules.unique({ table: 'individualDonorProfiles', column: 'email' }),
        ]),
        country: schema.string.optional({ trim: true }),
        region: schema.string.optional({ trim: true }),
        address: schema.string.optional({ trim: true }),
        occupation: schema.string.optional({ trim: true }),
      }),
      data: payload,
      messages,
    })
  }
}

export default new IndividualDonorProfileValidator()
