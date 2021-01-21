import {inject, injectable} from "tsyringe";
import IOffersRepository from "@modules/offers/repositories/IOffersRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class DeleteOffersService {
    constructor(
        @inject('OffersRepository')
        private offersRepository: IOffersRepository,
    ) {
    }

    public async execute(advertiser_name: string): Promise<void> {

        const offer = await this.offersRepository.findByAdvertiserName(advertiser_name);

        if (!offer) {
            throw new AppError('The advertiser do not exists', 400)
        }

        return await this.offersRepository.delete(advertiser_name)
    }
}

export default DeleteOffersService;