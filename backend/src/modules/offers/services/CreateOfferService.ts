import {inject, injectable} from "tsyringe";
import IOffersRepository from "@modules/offers/repositories/IOffersRepository";
import Offer from "@modules/offers/infra/typeorm/entities/Offer";
import AppError from "@shared/errors/AppError";

interface IRequest {
    advertiser_name: string
    url: string
    description: string
    premium: boolean
    ends_at: string
    starts_at: string
}

@injectable()
class CreateOfferService {
    constructor(
        @inject('OffersRepository')
        private offersRepository: IOffersRepository,
    ) {
    }

    public async execute(request:IRequest): Promise<Offer> {
        const checkOfferExists = await this.offersRepository.findByAdvertiserName(request.advertiser_name);

        if (checkOfferExists) {
            throw new AppError('The advertiser already exists')
        }

        return await this.offersRepository.create(request);
    }
}

export default CreateOfferService;