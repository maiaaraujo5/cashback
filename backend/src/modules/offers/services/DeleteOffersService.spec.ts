import FakeOffersRepository from "@modules/offers/repositories/fakes/FakeOffersRepository";
import AppError from "@shared/errors/AppError";
import DeleteOffersService from "@modules/offers/services/DeleteOffersService";

let fakeOffersRepository: FakeOffersRepository;
let deleteOffersService: DeleteOffersService;

describe('DeleteOffer', () => {
    beforeEach(() => {
        fakeOffersRepository = new FakeOffersRepository();

        deleteOffersService = new DeleteOffersService(fakeOffersRepository)
    });

    it("should be able to delete an offer", async () => {
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

        await deleteOffersService.execute("brand");

        const findAll = await fakeOffersRepository.findAll();

        expect(findAll).toEqual([{
            id: 2,
            advertiser_name: "brand2",
            url: "http://brand2.com.br",
            premium: true,
            description: "description2",
            ends_at: new Date(2021, 4, 10, 12),
            starts_at: new Date(2021, 3, 10, 12),
            status: "enabled"
        }]);
    });

    it("should not be able to delete a non existent offer", async () => {
        await expect(deleteOffersService.execute("brand")).rejects.toBeInstanceOf(AppError);
    })

});

