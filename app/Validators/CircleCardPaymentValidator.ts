import { validator, schema } from '@ioc:Adonis/Core/Validator'
import messages from './ValidatorErrorMessages'

class CircleCardPaymentValidator {
  public addNewCard(payload) {
    return validator.validate({
      schema: schema.create({
        billingDetails: schema.object().members({
          name: schema.string(),
          city: schema.string(),
          country: schema.string(),
          line1: schema.string(),
          line2: schema.string.optional(),
          district: schema.string.optional(),
          postalCode: schema.string(),
        }),
        metadata: schema.object().members({
          email: schema.string(),
          phoneNumber: schema.string.optional(),
          sessionId: schema.string(),
          ipAddress: schema.string(),
        }),
        idempotencyKey: schema.string(),
        keyId: schema.string.optional(),
        encryptedData: schema.string(),
        expMonth: schema.number(),
        expYear: schema.number(),
      }),
      data: payload,
      messages,
    })
  }
  public pay(payload) {
    return validator.validate({
      schema: schema.create({
        circleCardId: schema.string(),
        ipAddress: schema.string({ trim: true }),
        sessionId: schema.string(),
        idempotencyKey: schema.string(),
        keyId: schema.string.optional(),
        amount: schema.object().members({
          currency: schema.string(),
          amount: schema.string(),
        }),
      }),
      data: payload,
      messages,
    })
  }
}

export default new CircleCardPaymentValidator()
