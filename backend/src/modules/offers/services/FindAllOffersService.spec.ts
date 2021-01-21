import FakeOffersRepository from "@modules/offers/repositories/fakes/FakeOffersRepository";
import AppError from "@shared/errors/AppError";
import DeleteOffersService from "@modules/offers/services/DeleteOffersService";
import FindAllOffersService from "@modules/offers/services/FindAllOffersService";

let fakeOffersRepository: FakeOffersRepository;
let findAllOffersService: FindAllOffersService;

describe('FindAllOffers', () => {
    beforeEach(() => {
        fakeOffersRepository = new FakeOffersRepository();

        findAllOffersService = new FindAllOffersService(fakeOffersRepository)
    });

    it("should be able to find all offers", async () => {
        await fakeOffersRepository.create({
            advertiser_name: "brand",
            url: "http://brand.com.br",
            premium: false,
            description: "description",
            ends_at: new Date(2021, 4, 10, 12),
            starts_at: new Date(2021, 3, 10, 12),
            status: "disabled"
        });

        await fakeOffersRepository.create({
            advertiser_name: "brand2",
            url: "http://brand2.com.br",
            premium: true,
            description: "description2",
            ends_at: new Date(2021, 4, 10, 12),
            starts_at: new Date(2021, 3, 10, 12),
            status: "enabled"
        });

        const offers = await findAllOffersService.execute();

        expect(offers).toEqual([
            {
                id: 1,
                advertiser_name: "brand",
                url: "http://brand.com.br",
                premium: false,
                description: "description",
                ends_at: new Date(2021, 4, 10, 12),
                starts_at: new Date(2021, 3, 10, 12),
                status: "disabled"
            },
            {
                id: 2,
                advertiser_name: "brand2",
                url: "http://brand2.com.br",
                premium: true,
                description: "description2",
                ends_at: new Date(2021, 4, 10, 12),
                starts_at: new Date(2021, 3, 10, 12),
                status: "enabled"
            }
           ])
    })
});

