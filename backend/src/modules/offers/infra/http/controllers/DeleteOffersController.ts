import {Request, Response} from 'express'
import {container} from "tsyringe";
import DeleteOffersService from "@modules/offers/services/DeleteOffersService";

export default class DeleteOffersController {
    public async delete(request: Request, response: Response): Promise<Response> {
        const {advertiser_name} = request.params;

        const updateOffer = container.resolve(DeleteOffersService);

        const offer = await updateOffer.execute(advertiser_name);

        return response.json(offer)
    }
}