import {Router} from 'express'
import OffersController from "@modules/offers/infra/http/controllers/OffersController";
import {celebrate, Segments, Joi} from "celebrate";

const offersRouter = Router();
const offersController = new OffersController();

offersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            advertiser_name: Joi.string().required(),
            url: Joi.string().required().uri(),
            description: Joi.string().required().max(500),
            starts_at: Joi.date().required()
        }
    }),
    offersController.create
);

export default offersRouter;