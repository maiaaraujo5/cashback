import {Request, Response} from 'express'
import {container} from "tsyringe";
import CreateOfferService from "@modules/offers/services/CreateOfferService";

export default class OffersController {
    public async create(request: Request, response: Response): Promise<Response> {
        const {advertiser_name, url, description, premium, ends_at, starts_at} = request.body;

        const createOffer = container.resolve(CreateOfferService);

        const offer = await createOffer.execute({
            advertiser_name,
            url,
            description,
            premium,
            ends_at,
            starts_at
        });

        return response.json(offer)
    }
}