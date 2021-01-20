import IOffersRepository from "@modules/offers/repositories/IOffersRepository";
import ICreateOfferDTO from "@modules/offers/dtos/ICreateOfferDTO";
import Offer from "@modules/offers/infra/typeorm/entities/Offer";
import {getRepository, Repository} from "typeorm";

export default class OffersRepository implements IOffersRepository {
    private ormRepository: Repository<Offer>;

    constructor() {
        this.ormRepository = getRepository(Offer)
    }

    public async create(data: ICreateOfferDTO): Promise<Offer> {
        const offer = this.ormRepository.create(data);

        await this.ormRepository.save(offer);

        return offer
    }

    public async findAll(): Promise<Offer[]> {
        return this.ormRepository.find();
    }

    public async findByAdvertiserName(advertiser_name: string): Promise<Offer | undefined> {
        return this.ormRepository.findOne({
            where: {advertiser_name},
        })
    }

    public async update(offer: Offer): Promise<Offer> {
        return await this.ormRepository.save(offer)
    }
}