import {Request, Response} from 'express'
import {container} from "tsyringe";
import UpdateOfferService from "@modules/offers/services/UpdateOfferService";

export default class OffersController {
    public async update(request: Request, response: Response): Promise<Response> {
        const {url, description, premium, ends_at, starts_at} = request.body;
        const {advertiser_name} = request.params;

        const updateOffer = container.resolve(UpdateOfferService);

        const offer = await updateOffer.execute({advertiser_name, url, ends_at, starts_at, premium, description});

        return response.json(offer)
    }
}