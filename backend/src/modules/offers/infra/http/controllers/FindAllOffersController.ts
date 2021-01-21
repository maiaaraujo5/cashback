import {Request, Response} from "express";
import {container} from "tsyringe";
import FindAllOffersService from "@modules/offers/services/FindAllOffersService";

export default class FindAllOffersController {
    public async find(request: Request, response: Response): Promise<Response> {

        const listAllOffers = container.resolve(FindAllOffersService);

        const offers = await listAllOffers.execute();

        return response.json(offers)
    }
}