import FakeOffersRepository from "@modules/offers/repositories/fakes/FakeOffersRepository";
import AppError from "@shared/errors/AppError";
import DeleteOffersService from "@modules/offers/services/DeleteOffersService";
import FindAllOffersService from "@modules/offers/services/FindAllOffersService";
import UpdateOffersService from "@modules/offers/services/UpdateOffersService";
import UpdateOffersStatusService from "@modules/offers/services/UpdateOffersStatusService";
import offersRouter from "@modules/offers/infra/http/routes/offers.routes";

let fakeOffersRepository: FakeOffersRepository;
let updateOffersStatusService: UpdateOffersStatusService;

describe('UpdateOffersStatus', () => {
    beforeEach(() => {
        fakeOffersRepository = new FakeOffersRepository();

        updateOffersStatusService = new UpdateOffersStatusService(fakeOffersRepository)
    });

    it('should be able to enabled status successfully', async () => {
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

        const offer = await updateOffersStatusService.execute({
            advertiser_name: "brand",
            status: "enabled"
        });

        expect(offer).toEqual(
            {
                id: 1,
                advertiser_name: "brand",
                url: "http://brand.com.br",
                premium: false,
                description: "description",
                ends_at: new Date(2021, 10, 10, 12),
                starts_at: new Date(2021, 3, 10, 12),
                status: "enabled"
            })
    });

    it('should not be able to update status from non existing offer', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 6, 10, 12).getTime()
        });

        await expect(updateOffersStatusService.execute({
            advertiser_name: "brand",
            status: "enabled"
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to enable one offer that already ends', async () => {

        await fakeOffersRepository.create({
            advertiser_name: "brand",
            url: "http://brand.com.br",
            premium: false,
            description: "description",
            ends_at: new Date(2020, 10, 10, 12),
            starts_at: new Date(2020, 3, 10, 12),
            status: "disabled"
        });

        await expect(updateOffersStatusService.execute({
            advertiser_name: "brand",
            status: "enabled"
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should be able disable one offer regardless the time of end', async () => {

        await fakeOffersRepository.create({
            advertiser_name: "brand",
            url: "http://brand.com.br",
            premium: false,
            description: "description",
            ends_at: new Date(2021, 3, 10, 12),
            starts_at: new Date(2020, 3, 10, 12),
            status: "enabled"
        });

        const offer = await updateOffersStatusService.execute({
            advertiser_name: "brand",
            status: "disabled"
        });

        expect(offer).toEqual(
            {
                id: 1,
                advertiser_name: "brand",
                url: "http://brand.com.br",
                premium: false,
                description: "description",
                ends_at: new Date(2021, 3, 10, 12),
                starts_at: new Date(2020, 3, 10, 12),
                status: "disabled"
            })
    })
});

