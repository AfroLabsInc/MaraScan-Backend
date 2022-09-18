import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BeneficiaryLand from 'App/Models/BeneficiaryLand'
import BeneficiaryLandValidator from 'App/Validators/BeneficiaryLandValidator'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import { string } from '@ioc:Adonis/Core/Helpers'
import ImageService from 'App/Services/ImageService'
import Beneficiary from 'App/Models/Beneficiary'
import Image from 'App/Models/Image'

export default class BeneficiaryLandsController {
  private saveImage(image: MultipartFileContract, beneficiaryAccountAddress: string) {
    const tmpPath = image.tmpPath!
    const fileName = image.clientName
    const folder = `beneficiaries/titleDeeds/${string.toSlug(beneficiaryAccountAddress)}`
    return ImageService.uploadImage({ tmpPath, folder, fileName })
  }
  public async index({}: HttpContextContract) {}

  public async store({ request, params }: HttpContextContract) {
    const beneficiaryId: number = params.beneficiary_id

    const beneficiary = await Beneficiary.findOrFail(beneficiaryId)

    const payload = await BeneficiaryLandValidator.store({
      ...request.all(),
      titleDeedImage: request.file('titleDeedImage'),
    })

    const titleDeedImage = await this.saveImage(
      payload.titleDeedImage!,
      beneficiary.ethereumAccountAddress
    )
    const titleDeedImageId = await (await Image.create({ ...titleDeedImage })).id

    const beneficiaryLand = await BeneficiaryLand.create({ titleDeedImageId, ...payload })

    return {
      status: 201,
      message: 'Beneficiary Land Created Successfully',
      data: beneficiaryLand,
    }
  }

  public async show({ params }: HttpContextContract) {
    const landId: number = params.id

    const beneficiaryLand = await BeneficiaryLand.query().where('id', landId)

    return {
      status: 200,
      message: 'Beneficiary land Details Fetched Successfully',
      data: beneficiaryLand,
    }
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
