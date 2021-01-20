import {inject, injectable} from "tsyringe";
import IOffersRepository from "@modules/offers/repositories/IOffersRepository";
import Offer from "@modules/offers/infra/typeorm/entities/Offer";
import AppError from "@shared/errors/AppError";
import {isAfter, isBefore, isEqual} from "date-fns";

interface IRequest {
    advertiser_name: string
    url: string
    description: string
    premium: boolean
    ends_at: Date
    starts_at: Date
}

@injectable()
class UpdateOfferService {
    constructor(
        @inject('OffersRepository')
        private offersRepository: IOffersRepository,
    ) {
    }

    public async execute(data: IRequest): Promise<Offer> {

        const offer = await this.offersRepository.findByAdvertiserName(data.advertiser_name);
        if (!offer) {
            throw new AppError('The advertiser do not exists', 400)
        }

        if (isBefore(data.ends_at, data.starts_at) || isEqual(data.starts_at, data.ends_at)) {
            throw new AppError(`The ends_at date have to be greater than starts_at date`, 400)
        }

        const update = Object.assign(offer, data);
        update.status = getStatus(data.starts_at, data.ends_at);
        update.updated_at = new Date();

        return await this.offersRepository.update(update)
    }
}

function getStatus(starts_at: Date, ends_at: Date): 'enabled' | 'disabled' {
    if (isAfter(Date.now(), starts_at) && isBefore(Date.now(), ends_at)) {
        return "enabled"
    }

    if (isAfter(Date.now(), ends_at)) {
        return "disabled"
    }

    return "disabled"
}

export default UpdateOfferService