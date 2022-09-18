import { validator, schema } from '@ioc:Adonis/Core/Validator'
import messages from './ValidatorErrorMessages'

class BeneficiaryValidator {
  public store(payload) {
    return validator.validate({
      schema: schema.create({
        titleDeedImage: schema.file({
          size: '20mb',
          extnames: ['jpg', 'png', 'jpeg'],
        }),
        titleDeedIdentification: schema.string({ trim: true }),
        numOfAcres: schema.number(),
      }),
      data: payload,
      messages,
    })
  }
  public update(payload) {
    return validator.validate({
      schema: schema.create({}),
      data: payload,
      messages,
    })
  }
}

export default new BeneficiaryValidator()
