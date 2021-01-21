import FakeOffersRepository from "@modules/offers/repositories/fakes/FakeOffersRepository";
import AppError from "@shared/errors/AppError";
import DeleteOffersService from "@modules/offers/services/DeleteOffersService";
import FindAllOffersService from "@modules/offers/services/FindAllOffersService";
import UpdateOffersService from "@modules/offers/services/UpdateOffersService";

let fakeOffersRepository: FakeOffersRepository;
let updateOffersService: UpdateOffersService;

describe('UpdateOffers', () => {
    beforeEach(() => {
        fakeOffersRepository = new FakeOffersRepository();

        updateOffersService = new UpdateOffersService(fakeOffersRepository)
    });

    it("should be able to update an offer and get status enabled", async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 6, 10, 12).getTime()
        });

        await fakeOffersRepository.create({
            advertiser_name: "brand",
            url: "http://brand.com.br",
            premium: false,
            description: "description",
            ends_at: new Date(2021, 10, 10, 12),
            starts_at: new Date(2021, 3, 10, 12),
            status: "disabled"
        });

        const offer = await updateOffersService.execute({
            advertiser_name: "brand",
            url: "http://brand.com.br",
            premium: true,
            description: "new description",
            ends_at: new Date(2021, 8, 10, 12),
            starts_at: new Date(2021, 3, 10, 12),
        });

        expect(offer).toEqual({
            id: 1,
            advertiser_name: "brand",
            url: "http://brand.com.br",
            premium: true,
            description: "new description",
            status: "enabled",
            ends_at: new Date(2021, 8, 10, 12),
            starts_at: new Date(2021, 3, 10, 12),
        })

    })

    it("should be able to update an offer and get status disabled", async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 10, 10, 12).getTime()
        });

        await fakeOffersRepository.create({
            advertiser_name: "brand",
            url: "http://brand.com.br",
            premium: false,
            description: "description",
            ends_at: new Date(2021, 10, 10, 12),
            starts_at: new Date(2021, 3, 10, 12),
            status: "disabled"
        });

        const offer = await updateOffersService.execute({
            advertiser_name: "brand",
            url: "http://brand.com.br",
            premium: true,
            description: "new description",
            ends_at: new Date(2021, 7, 10, 12),
            starts_at: new Date(2021, 3, 10, 12),
        });

        expect(offer).toEqual({
            id: 1,
            advertiser_name: "brand",
            url: "http://brand.com.br",
            premium: true,
            description: "new description",
            status: "disabled",
            ends_at: new Date(2021, 7, 10, 12),
            starts_at: new Date(2021, 3, 10, 12),
        })

    });

    it("should not be able to update an offer that do not exists", async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 10, 10, 12).getTime()
        });

        await expect(updateOffersService.execute({
            advertiser_name: "brand",
            url: "http://brand.com.br",
            premium: true,
            description: "new description",
            ends_at: new Date(2021, 7, 10, 12),
            starts_at: new Date(2021, 3, 10, 12),
        })).rejects.toBeInstanceOf(AppError);


    });

    it("should not be able to update an offer with ends_at less than starts_at", async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 10, 10, 12).getTime()
        });

        await fakeOffersRepository.create({
            advertiser_name: "brand",
            url: "http://brand.com.br",
            premium: false,
            description: "description",
            ends_at: new Date(2021, 10, 10, 12),
            starts_at: new Date(2021, 3, 10, 12),
            status: "disabled"
        });

        await expect(updateOffersService.execute({
            advertiser_name: "brand",
            url: "http://brand.com.br",
            premium: true,
            description: "new description",
            ends_at: new Date(2021, 2, 10, 12),
            starts_at: new Date(2021, 3, 10, 12),
        })).rejects.toBeInstanceOf(AppError);

    });

    it("should not be able to update an offer with ends_at equal to starts_at", async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 10, 10, 12).getTime()
        });

        await fakeOffersRepository.create({
            advertiser_name: "brand",
            url: "http://brand.com.br",
            premium: false,
            description: "description",
            ends_at: new Date(2021, 10, 10, 12),
            starts_at: new Date(2021, 3, 10, 12),
            status: "disabled"
        });

        await expect(updateOffersService.execute({
            advertiser_name: "brand",
            url: "http://brand.com.br",
            premium: true,
            description: "new description",
            ends_at: new Date(2021, 3, 10, 12),
            starts_at: new Date(2021, 3, 10, 12),
        })).rejects.toBeInstanceOf(AppError);

    });
});

