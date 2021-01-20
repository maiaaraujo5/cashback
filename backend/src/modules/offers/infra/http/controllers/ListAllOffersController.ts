import {Request, Response} from "express";
import {container} from "tsyringe";
import findAllOffersService from "@modules/offers/services/FindAllOffersService";

export default class ListAllOffersController {
    public async find(request: Request, response: Response): Promise<Response> {

        const listAllOffers = container.resolve(findAllOffersService);

        const offers = await listAllOffers.execute();

        return response.json(offers)
    }
}