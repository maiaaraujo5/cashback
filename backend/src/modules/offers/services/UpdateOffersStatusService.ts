import {inject, injectable} from "tsyringe";
import IOffersRepository from "@modules/offers/repositories/IOffersRepository";
import Offer from "@modules/offers/infra/typeorm/entities/Offer";
import AppError from "@shared/errors/AppError";
import {isAfter, isBefore, isEqual} from "date-fns";

interface IRequest {
    advertiser_name: string
    status: string
}

@injectable()
class UpdateOffersStatusService {
    constructor(
        @inject('OffersRepository')
        private offersRepository: IOffersRepository,
    ) {
    }

    public async execute({advertiser_name, status}: IRequest): Promise<Offer> {

        const offer = await this.offersRepository.findByAdvertiserName(advertiser_name);
        if (!offer) {
            throw new AppError('The advertiser do not exists', 400)
        }

        if (status === 'enabled' && isAfter(Date.now(), offer.ends_at)){
            throw new AppError(`You can't enabled one offer that already ends`, 412)
        }

        const update = Object.assign(offer, {status: status});
        update.updated_at = new Date();

        return await this.offersRepository.update(update)
    }
}

export default UpdateOffersStatusService;