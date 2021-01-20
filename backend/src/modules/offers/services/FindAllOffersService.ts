import {inject, injectable} from "tsyringe";
import IOffersRepository from "@modules/offers/repositories/IOffersRepository";
import Offer from "@modules/offers/infra/typeorm/entities/Offer";

@injectable()
class findAllOffersService {
    constructor(
        @inject('OffersRepository')
        private offersRepository: IOffersRepository,
    ) {
    }

    public async execute(): Promise<Offer[] | undefined> {
        const offers = await this.offersRepository.findAll();

        offers.sort((a, b) => {
            if (a.premium === b.premium) {
                return 0
            } else {
                return -1
            }
        });

        return offers;
    }
}
export default findAllOffersService