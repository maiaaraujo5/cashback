import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity('offers')
class Offer {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column()
    advertiser_name: string;

    @Column()
    url: string;

    @Column()
    description: string;

    @Column()
    premium: boolean;

    @Column({type: 'timestamp'})
    ends_at: Date;

    @Column({type: 'timestamp'})
    starts_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Offer