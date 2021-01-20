import {Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity('offers')
class Offer {
    @Column()
    id: number;

    @PrimaryColumn()
    advertiser_name: string;

    @Column()
    url: string;

    @Column()
    description: string;

    @Column()
    premium: boolean;

    @Column()
    status: string;

    @Column('timestamp with time zone')
    ends_at: Date;

    @Column('timestamp with time zone')
    starts_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Offer