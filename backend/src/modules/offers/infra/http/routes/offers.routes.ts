import {Router} from 'express'
import OffersController from "@modules/offers/infra/http/controllers/OffersController";
import {celebrate, Joi, Segments} from "celebrate";
import FindAllOffersController from "@modules/offers/infra/http/controllers/FindAllOffersController";
import UpdateOffersController from "@modules/offers/infra/http/controllers/UpdateOffersController";

const offersRouter = Router();
const offersController = new OffersController();
const listAllOffersController = new FindAllOffersController();
const updateOfferController = new UpdateOffersController();

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
    celebrate({
        [Segments.BODY]: {
            advertiser_name: Joi.string().required(),
            url: Joi.string().required().uri(),
            description: Joi.string().required().max(500),
            starts_at: Joi.date().required(),
            ends_at: Joi.date().optional(),
            premium: Joi.bool().optional(),
        }
    }),
    offersController.create
);

offersRouter.put(
    '/:advertiser_name',
    celebrate({
        [Segments.BODY]: {
            url: Joi.string().required().uri(),
            description: Joi.string().required().max(500),
            starts_at: Joi.date().required(),
            ends_at: Joi.date().optional(),
            premium: Joi.bool().optional(),
        },
        [Segments.PARAMS]: {
            advertiser_name: Joi.string().required(),
        }
    }),
    updateOfferController.update
);

offersRouter.get('/', listAllOffersController.find);

export default offersRouter;