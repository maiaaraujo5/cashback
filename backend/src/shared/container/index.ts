import {container} from "tsyringe";
import IOffersRepository from "@modules/offers/repositories/IOffersRepository";
import OffersRepository from "@modules/offers/infra/typeorm/repositories/OffersRepository";

container.registerSingleton<IOffersRepository>(
    'OffersRepository',
    OffersRepository
);