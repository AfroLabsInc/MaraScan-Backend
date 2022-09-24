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

  public async index({ params }: HttpContextContract) {
    const conservancyId: number = params.conservancy_id
    const categories = await BeneficiaryCategory.query()
      .where('conservancyId', conservancyId)
      .preload('coverImage')
      .preload('beneficiaries', (beneficiary) => {
        beneficiary.preload('land')
      })

    return {
      status: 200,
      message: 'Beneficiary Categories Fetched Successfully',
      data: categories,
    }
  }

  public async store({ request, params }: HttpContextContract) {
    const conservancyId = params.conservancy_id
    const { title, description, coverImage } = await BeneficiaryCategoryValidator.store({
      ...request.all(),
      coverImage: request.file('coverImage'),
    })

    let category

    if (coverImage) {
      const image = await this.saveImage(coverImage, title)
      const coverImageId = await (await Image.create(image)).id

      category = await BeneficiaryCategory.create({
        title,
        description,
        coverImageId,
        conservancyId,
      })
    } else {
      category = await BeneficiaryCategory.create({ title, description, conservancyId })
    }

    return {
      status: 201,
      message: 'Beneficiary Category Created Successfully',
      data: category,
    }
  }

  public async show({ params }: HttpContextContract) {
    const categoryId: number = params.id

    const category = await BeneficiaryCategory.query()
      .where('id', categoryId)
      .preload('coverImage')
      .preload('beneficiaries', (beneficiary) => {
        beneficiary.preload('land')
      })
      .firstOrFail()

    return {
      status: 200,
      message: 'Beneficiary Category Details Fetched Successfully',
      data: category,
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const categoryId: number = params.id
    const payload = await BeneficiaryCategoryValidator.update({
      ...request.all(),
      coverImage: request.file('coverImage'),
    })

    let category = await BeneficiaryCategory.query()
      .where('id', categoryId)
      .preload('coverImage')
      .firstOrFail()

    if (payload.coverImage) {
      if (category.coverImageId) {
        await ImageService.deleteImage(category.coverImage.fileId)

        await (await Image.findOrFail(category.coverImageId)).delete()
      }

      const image = await this.saveImage(payload.coverImage, category.title)
      const coverImageId = await (await Image.create(image)).id

      category.merge({ ...payload, coverImageId: coverImageId })
      await category.save()
    } else {
      category.merge(payload)
      await category.save()
    }

    return {
      status: 200,
      message: 'Beneficiary Category Updated Successfully',
      data: await BeneficiaryCategory.query()
        .where('id', categoryId)
        .preload('coverImage')
        .firstOrFail(),
    }
  }

  public async destroy({}: HttpContextContract) {}
}
