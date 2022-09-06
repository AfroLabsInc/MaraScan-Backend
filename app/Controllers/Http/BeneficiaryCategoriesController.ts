import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BeneficiaryCategory from 'App/Models/BeneficiaryCategory'
import BeneficiaryCategoryValidator from 'App/Validators/BeneficiaryCategoryValidator'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import { string } from '@ioc:Adonis/Core/Helpers'
import ImageService from 'App/Services/ImageService'
import Image from 'App/Models/Image'

export default class BeneficiaryCategoriesController {
  private saveImage(image: MultipartFileContract, categoryName: string) {
    const tmpPath = image.tmpPath!
    const fileName = image.clientName
    const folder = `categories/${string.toSlug(categoryName)}`
    return ImageService.uploadImage({ tmpPath, folder, fileName })
  }
  public async index({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const { title, description, coverImage } = await BeneficiaryCategoryValidator.store({
      ...request.all(),
      coverImage: request.file('coverImage'),
    })

    let category

    if (coverImage) {
      const image = await this.saveImage(coverImage, title)
      const coverImageId = await (await Image.create(image)).id

      category = await BeneficiaryCategory.create({ title, description, coverImageId })
    } else {
      category = await BeneficiaryCategory.create({ title, description })
    }

    return {
      status: 201,
      message: 'Beneficiary Category Created Successfully',
      data: category,
    }
  }

  public async show({ params }: HttpContextContract) {
    const categoryId: number = params.category_id

    const category = await BeneficiaryCategory.query().where('id', categoryId).firstOrFail()

    return {
      status: 200,
      message: 'Beneficiary Category Details Fetched Successfully',
      data: category,
    }
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
