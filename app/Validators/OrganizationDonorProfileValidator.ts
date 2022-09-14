import { validator, schema, rules } from '@ioc:Adonis/Core/Validator'
import messages from './ValidatorErrorMessages'

class OrganizationDonorProfileValidator {
  public store(payload) {
    return validator.validate({
      schema: schema.create({
        name: schema.string({ trim: true }),
        description: schema.string({ trim: true }),
        type: schema.enum(['governmental', 'non-governmental']),
        email: schema.string({ trim: true }, [
          rules.unique({ table: 'organizationDonorProfiles', column: 'email' }),
        ]),
        country: schema.string({ trim: true }),
        region: schema.string({ trim: true }),
        addressOne: schema.string({ trim: true }),
        addressTwo: schema.string.optional({ trim: true }),
        website: schema.string.optional({ trim: true }),
      }),
      data: payload,
      messages,
    })
  }
  public update(payload) {
    return validator.validate({
      schema: schema.create({
        name: schema.string.optional({ trim: true }),
        description: schema.string.optional({ trim: true }),
        type: schema.enum.optional(['governmental', 'non-governmental']),
        email: schema.string.optional({ trim: true }, [
          rules.unique({ table: 'organizationDonorProfiles', column: 'email' }),
        ]),
        country: schema.string.optional({ trim: true }),
        region: schema.string.optional({ trim: true }),
        addressOne: schema.string.optional({ trim: true }),
        addressTwo: schema.string.optional({ trim: true }),
        website: schema.string.optional({ trim: true }),
      }),
      data: payload,
      messages,
    })
  }
}

export default new OrganizationDonorProfileValidator()
