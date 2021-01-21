import {Request, Response} from "express";
import {container} from "tsyringe";
import UpdateOffersService from "@modules/offers/services/UpdateOffersService";
import UpdateOffersStatusService from "@modules/offers/services/UpdateOffersStatusService";

export default class UpdateOffersStatusController{
    public async update(request: Request, response: Response): Promise<Response> {
        const {advertiser_name, status} = request.params;

        const updateOffer = container.resolve(UpdateOffersStatusService);

        const offer = await updateOffer.execute({advertiser_name, status});

        return response.json(offer)
    }
}