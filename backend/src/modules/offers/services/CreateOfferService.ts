import {inject, injectable} from "tsyringe";
import {isBefore, isAfter, format, isValid, isEqual} from 'date-fns'
import IOffersRepository from "@modules/offers/repositories/IOffersRepository";
import Offer from "@modules/offers/infra/typeorm/entities/Offer";
import AppError from "@shared/errors/AppError";

interface IRequest {
    advertiser_name: string
    url: string
    description: string
    premium: boolean
    ends_at: Date
    starts_at: Date
}

@injectable()
class CreateOfferService {
    constructor(
        @inject('OffersRepository')
        private offersRepository: IOffersRepository,
    ) {
    }

    public async execute({
                             advertiser_name, url, description,
                             premium = false, starts_at, ends_at
                         }: IRequest): Promise<Offer> {

        const checkOfferExists = await this.offersRepository.findByAdvertiserName(advertiser_name);

        if (checkOfferExists) {
            throw new AppError('The advertiser already exists', 409)
        }

        if (isBefore(ends_at, starts_at) || isEqual(starts_at, ends_at)) {
            throw new AppError(`You can't create one offer to end in the past of start`, 400)
        }

        return await this.offersRepository.create({
            advertiser_name,
            url,
            description,
            premium,
            status: "disabled",
            starts_at,
            ends_at
        });
    }
}

// function getStatus(starts_at: Date, ends_at: Date): 'enabled' | 'disabled' {
//     if (isAfter(Date.now(), starts_at)) {
//         return "enabled"
//     }
//
//     if (isAfter(Date.now(), ends_at)) {
//         return "disabled"
//     }
//
//     return "disabled"
// }

export default CreateOfferService;