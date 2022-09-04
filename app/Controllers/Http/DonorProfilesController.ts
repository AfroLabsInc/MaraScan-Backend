import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Donor from 'App/Models/Donor'
import IndividualDonorProfile from 'App/Models/IndividualDonorProfile'
import OrganizationDonorProfile from 'App/Models/OrganizationDonorProfile'
import IndividualDonorProfileValidator from 'App/Validators/IndividualDonorProfileValidator'
import OrganizationDonorProfileValidator from 'App/Validators/OrganizationDonorProfileValidator'

export default class DonorProfilesController {
  public async index({}: HttpContextContract) {}

  public async store({ request, params }: HttpContextContract) {
    const donorId: number = params.donor_id
    const donor = await Donor.findOrFail(donorId)

    if (donor.donorType === 'individual') {
      const payload = await IndividualDonorProfileValidator.store({ ...request.all() })

      const profile = await IndividualDonorProfile.create({ ...payload, donorId })

      return {
        status: 201,
        message: 'Individual Donor Profile Created Successfully',
        data: profile,
      }
    } else {
      const payload = await OrganizationDonorProfileValidator.store({ ...request.all() })

      const profile = await OrganizationDonorProfile.create({ ...payload, donorId })

      return {
        status: 201,
        message: 'Individual Donor Profile Created Successfully',
        data: profile,
      }
    }
  }

  public async show({ params }: HttpContextContract) {
    const donorId: number = params.donor_id

    const donor = await Donor.query()
      .where('id', donorId)
      .preload('kyc')
      .preload('individualProfile')
      .preload('organizationProfile')
      .firstOrFail()

    return {
      status: 200,
      message: 'Donor Details Fetched Successfully',
      data: donor,
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const donorId: number = params.donorId
    const profileId: number = params.id

    const donor = await Donor.findOrFail(donorId)

    if (donor.donorType === 'individual') {
      const payload = await IndividualDonorProfileValidator.update({ ...request.all() })

      const profile = await (await IndividualDonorProfile.findOrFail(profileId)).merge(payload)

      return {
        status: 200,
        message: 'Individual Donor Profile Created Successfully',
        data: profile,
      }
    } else {
      const payload = await OrganizationDonorProfileValidator.update({ ...request.all() })

      const profile = await (await OrganizationDonorProfile.findOrFail(profileId)).merge(payload)

      return {
        status: 200,
        message: 'Individual Donor Profile Created Successfully',
        data: profile,
      }
    }
  }

  public async destroy({}: HttpContextContract) {}
}
