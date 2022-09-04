import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DonorValidator from 'App/Validators/DonorValidator'
import DonorKyc from 'App/Models/DonorKyc'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import { string } from '@ioc:Adonis/Core/Helpers'
import ImageService from 'App/Services/ImageService'
import Donor from 'App/Models/Donor'
import Image from 'App/Models/Image'

export default class DonorKycsController {
  private saveImage(image: MultipartFileContract, donorAccountAddress: string) {
    const tmpPath = image.tmpPath!
    const fileName = image.clientName
    const folder = `donors/kyc/${string.toSlug(donorAccountAddress)}`
    return ImageService.uploadImage({ tmpPath, folder, fileName })
  }
  public async store({ request, params }: HttpContextContract) {
    const donorId: number = params.donor_id
    const donor = await Donor.findOrFail(donorId)

    const payload = await DonorValidator.submitKyc({
      ...request.all(),
      idCardFrontImage: request.file('idCardFrontImage'),
      idCardBackImage: request.file('idCardBackImage'),
      photo: request.file('photo'),
    })

    if (payload.donorType === 'individual') {
      const idCardFront = await this.saveImage(payload.idCardFrontImage!, donor.accountAddress)
      const idCardFrontImageId = await (await Image.create({ ...idCardFront })).id

      const idCardBack = await this.saveImage(payload.idCardBackImage!, donor.accountAddress)
      const idCardBackImageId = await (await Image.create({ ...idCardBack })).id

      const photo = await this.saveImage(payload.photo!, donor.accountAddress)
      const photoId = await (await Image.create({ ...photo })).id

      await DonorKyc.create({
        donorId,
        photoId,
        idCardFrontImageId,
        idCardBackImageId,
        donorType: payload.donorType,
      })
    } else {
      await DonorKyc.create({ ...payload, donorId })
    }

    return {
      status: 201,
      message: 'Donor KYC Submitted Successfully',
    }
  }
}
