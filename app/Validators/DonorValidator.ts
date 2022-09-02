import { validator, schema, rules } from '@ioc:Adonis/Core/Validator'
import messages from './ValidatorErrorMessages'

class DonorValidator {
  public store(payload) {
    return validator.validate({
      schema: schema.create({
        accountAddress: schema.string({ trim: true }, [
          rules.unique({ table: 'donors', column: 'accountAddress' }),
        ]),
        donorType: schema.enum(['individual', 'organization']),
      }),
      data: payload,
      messages,
    })
  }
}

export default new DonorValidator()
