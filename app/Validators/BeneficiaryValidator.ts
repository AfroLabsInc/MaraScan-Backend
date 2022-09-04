import { validator, schema, rules } from '@ioc:Adonis/Core/Validator'
import messages from './ValidatorErrorMessages'

class BeneficiaryValidator {
  public store(payload) {
    return validator.validate({
      schema: schema.create({
        categoryId: schema.number(),
        firstName: schema.string({ trim: true }),
        lastName: schema.string({ trim: true }),
        mobile: schema.string({ trim: true }),
        email: schema.string.optional({ trim: true }, [
          rules.unique({ table: 'individualDonorProfiles', column: 'email' }),
        ]),
        country: schema.string({ trim: true }),
        region: schema.string({ trim: true }),
        address: schema.string({ trim: true }),
      }),
      data: payload,
      messages,
    })
  }
  public update(payload) {
    return validator.validate({
      schema: schema.create({
        categoryId: schema.number.optional(),
        firstName: schema.string.optional({ trim: true }),
        lastName: schema.string.optional({ trim: true }),
        email: schema.string.optional({ trim: true }, [
          rules.unique({ table: 'individualDonorProfiles', column: 'email' }),
        ]),
        country: schema.string.optional({ trim: true }),
        region: schema.string.optional({ trim: true }),
        address: schema.string.optional({ trim: true }),
      }),
      data: payload,
      messages,
    })
  }

  public submitKyc(payload) {
    return validator.validate({
      schema: schema.create({
        identificationNumber: schema.string(),
      }),
      data: payload,
      messages,
    })
  }
}

export default new BeneficiaryValidator()
