import {inject, injectable} from "tsyringe";
import IOffersRepository from "@modules/offers/repositories/IOffersRepository";
import Offer from "@modules/offers/infra/typeorm/entities/Offer";

@injectable()
class FindAllOffersService {
    constructor(
        @inject('OffersRepository')
        private offersRepository: IOffersRepository,
    ) {
    }

    public async execute(): Promise<Offer[] | undefined> {
        return await this.offersRepository.findAll();
    }
}
export default FindAllOffersService