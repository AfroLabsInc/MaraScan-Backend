import { validator, schema, rules } from '@ioc:Adonis/Core/Validator'
import messages from './ValidatorErrorMessages'

class AdminValidator {
  public login(payload) {
    return validator.validate({
      schema: schema.create({
        email: schema.string({ trim: true }, [
          rules.email(),
          rules.exists({ table: 'admins', column: 'email' }),
        ]),
        password: schema.string({ trim: true }),
      }),
      data: payload,
      messages,
    })
  }
}

export default new AdminValidator()
