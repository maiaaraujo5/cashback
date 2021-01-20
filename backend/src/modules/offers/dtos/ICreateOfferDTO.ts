export default interface ICreateOfferDTO {
    advertiser_name: string
    url: string
    description: string
    premium: boolean
    status: 'enabled' | 'disabled'
    ends_at: Date
    starts_at: Date
}