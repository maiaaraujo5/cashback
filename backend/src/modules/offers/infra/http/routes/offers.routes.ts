import {Router} from 'express'
import OffersController from "@modules/offers/infra/http/controllers/OffersController";
import {celebrate, Segments, Joi} from "celebrate";
import ListAllOffersController from "@modules/offers/infra/http/controllers/ListAllOffersController";

const offersRouter = Router();
const offersController = new OffersController();
const listAllOffersController = new ListAllOffersController();

const schema = {
    [Segments.BODY]: {
        advertiser_name: Joi.string().required(),
        url: Joi.string().required().uri(),
        description: Joi.string().required().max(500),
        starts_at: Joi.date().required(),
        ends_at: Joi.date().optional(),
        premium: Joi.bool().optional(),
    }
};

offersRouter.post(
    '/',
    celebrate(schema),
    offersController.create
);

offersRouter.get('/', listAllOffersController.find);

export default offersRouter;