import {container} from "tsyringe";
import IOffersRepository from "@modules/offers/repositories/IOffersRepository";
import OffersRepository from "@modules/offers/infra/typeorm/repositories/OffersRepository";

container.register<IOffersRepository>(
    'OffersRepository',
    OffersRepository
);