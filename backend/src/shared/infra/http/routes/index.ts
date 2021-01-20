import {Router} from 'express'

import offersRouter from "@modules/offers/infra/http/routes/offers.routes";

const routes = Router();

routes.use('/offers', offersRouter);

export default routes;