import ICreateOfferDTO from "@modules/offers/dtos/ICreateOfferDTO";
import Offer from "@modules/offers/infra/typeorm/entities/Offer";

export default interface IOffersRepository {
    create(data: ICreateOfferDTO): Promise<Offer>

    findAll(): Promise<Offer[]>

    findByAdvertiserName(advertiser_name: string): Promise<Offer | undefined>

    update(offer: Offer): Promise<Offer>
}