import { validator, schema } from '@ioc:Adonis/Core/Validator'
import messages from './ValidatorErrorMessages'

class BeneficiaryCategoryValidator {
  public store(payload) {
    return validator.validate({
      schema: schema.create({
        title: schema.string(),
        description: schema.string(),
        coverImage: schema.file.optional({
          size: '20mb',
          extnames: ['jpg', 'png', 'jpeg'],
        }),
      }),
      data: payload,
      messages,
    })
  }
  public update(payload) {
    return validator.validate({
      schema: schema.create({
        title: schema.string(),
        description: schema.string(),
        coverImage: schema.file.optional({
          size: '20mb',
          extnames: ['jpg', 'png', 'jpeg'],
        }),
      }),
      data: payload,
      messages,
    })
  }
}

export default new BeneficiaryCategoryValidator()
