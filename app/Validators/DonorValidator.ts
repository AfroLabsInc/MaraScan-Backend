import { validator, schema, rules } from '@ioc:Adonis/Core/Validator'
import messages from './ValidatorErrorMessages'

class DonorValidator {
  public store(payload) {
    return validator.validate({
      schema: schema.create({
        accountAddress: schema.string.optional({ trim: true }, [
          rules.unique({ table: 'donors', column: 'accountAddress' }),
        ]),
        donorType: schema.enum(['individual', 'organization']),
        email: schema.string({ trim: true }, [rules.unique({ table: 'donors', column: 'email' })]),
        password: schema.string({ trim: true }),
      }),
      data: payload,
      messages,
    })
  }
  public walletAuth(payload) {
    return validator.validate({
      schema: schema.create({
        accountAddress: schema.string({ trim: true }),
        donorType: schema.enum(['individual', 'organization']),
      }),
      data: payload,
      messages,
    })
  }
  public login(payload) {
    return validator.validate({
      schema: schema.create({
        email: schema.string({ trim: true }, [
          rules.email(),
          rules.exists({ table: 'donors', column: 'email' }),
        ]),
        password: schema.string({ trim: true }),
      }),
      data: payload,
      messages,
    })
  }
  public submitKyc(payload) {
    return validator.validate({
      schema: schema.create({
        organizationIdentificationNumber: schema.string.optional(),
        donorType: schema.enum(['individual', 'organization']),
        idCardFrontImage: schema.file.optional({
          size: '20mb',
          extnames: ['jpg', 'png', 'jpeg'],
        }),
        idCardBackImage: schema.file.optional({
          size: '20mb',
          extnames: ['jpg', 'png', 'jpeg'],
        }),
        photo: schema.file.optional({
          size: '20mb',
          extnames: ['jpg', 'png', 'jpeg'],
        }),
      }),
      data: payload,
      messages,
    })
  }
}

export default new DonorValidator()
