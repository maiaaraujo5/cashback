import FakeOffersRepository from "@modules/offers/repositories/fakes/FakeOffersRepository";
import CreateOfferService from "@modules/offers/services/CreateOfferService";
import AppError from "@shared/errors/AppError";

let fakeOffersRepository: FakeOffersRepository;
let createOfferService: CreateOfferService;

describe('CreateOffer', () => {
    beforeEach(() => {
        fakeOffersRepository = new FakeOffersRepository();

        createOfferService = new CreateOfferService(fakeOffersRepository)
    });

    it('should be able to create a new offer', async () => {
        const offer = await createOfferService.execute({
            advertiser_name: "brand",
            url: "http://brand.com.br",
            premium: false,
            description: "description",
            ends_at: new Date(2021, 4, 10, 12),
            starts_at: new Date(2021, 3, 10, 12),
        });

        expect(offer).toEqual({
            id: 1,
            advertiser_name: "brand",
            url: "http://brand.com.br",
            premium: false,
            status: 'disabled',
            description: "description",
            ends_at: new Date(2021, 4, 10, 12),
            starts_at: new Date(2021, 3, 10, 12),
        })
    });

    it('should not be able to create a new offer with an advertiser name that already exists', async () => {
        await createOfferService.execute({
            advertiser_name: "brand",
            url: "http://brand.com.br",
            premium: false,
            description: "description",
            ends_at: new Date(2021, 4, 10, 12),
            starts_at: new Date(2021, 3, 10, 12),
        });

        await expect(createOfferService.execute({
            advertiser_name: "brand",
            url: "http://brands.com.br",
            premium: true,
            description: "description",
            ends_at: new Date(2021, 4, 10, 12),
            starts_at: new Date(2021, 3, 10, 12),
        })).rejects.toBeInstanceOf(AppError)
    });

    it('should not be able to create an offer with ends_at less than starts_at', async () => {
        await expect(createOfferService.execute({
            advertiser_name: "brand",
            url: "http://brand.com.br",
            premium: false,
            description: "description",
            ends_at: new Date(2021, 3, 10, 12),
            starts_at: new Date(2021, 4, 10, 12),
        })).rejects.toBeInstanceOf(AppError);
    })

    it('should not be able to create an offer with ends_at and starts_at equals', async () => {
        await expect(createOfferService.execute({
            advertiser_name: "brand",
            url: "http://brand.com.br",
            premium: false,
            description: "description",
            ends_at: new Date(2021, 4, 10, 12),
            starts_at: new Date(2021, 4, 10, 12),
        })).rejects.toBeInstanceOf(AppError);
    })
});

