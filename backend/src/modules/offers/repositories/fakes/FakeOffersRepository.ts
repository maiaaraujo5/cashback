import IOffersRepository from "@modules/offers/repositories/IOffersRepository";
import ICreateOfferDTO from "@modules/offers/dtos/ICreateOfferDTO";
import Offer from "@modules/offers/infra/typeorm/entities/Offer";

export default class FakeOffersRepository implements IOffersRepository {

    private offers: Offer[] = [];

    create(data: ICreateOfferDTO): Promise<Offer> {
        const offer = new Offer();
        Object.assign(offer, {
            id: this.offers.length + 1,
            advertiser_name: data.advertiser_name,
            url: data.url,
            description: data.description,
            premium: data.premium,
            status: data.status,
            ends_at: data.ends_at,
            starts_at: data.starts_at,
        });

        this.offers.push(offer);

        return Promise.resolve(offer)

    }

    delete(advertiser_name: string): Promise<void> {
        const index = this.offers.findIndex(offer => advertiser_name === offer.advertiser_name);

        this.offers.splice(index, 1);

        return Promise.resolve()
    }

    findAll(): Promise<Offer[]> {
        return Promise.resolve(this.offers);
    }

    findByAdvertiserName(advertiser_name: string): Promise<Offer | undefined> {
        const offer = this.offers.find(offer => offer.advertiser_name === advertiser_name);
        return Promise.resolve(offer)
    }

    update(data: Offer): Promise<Offer> {
        const updated = new Offer();
        const index = this.offers.findIndex(offer => offer.advertiser_name === data.advertiser_name);

        Object.assign(updated, {
            id: index + 1,
            advertiser_name: data.advertiser_name,
            url: data.url,
            description: data.description,
            premium: data.premium,
            status: data.status,
            ends_at: data.ends_at,
            starts_at: data.starts_at,
        });

        this.offers[index] = updated;

        return Promise.resolve(updated)
    }

}