import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOffer1611103601606 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                    name: 'offers',
                    columns: [
                        {
                            name: 'id',
                            type: 'int',
                            isGenerated: true,
                            generationStrategy: "increment"
                        },
                        {
                            name: 'advertiser_name',
                            type:  'varchar',
                            isPrimary: true,
                            isUnique: true,
                        },
                        {
                            name: 'url',
                            type: 'varchar',
                        },
                        {
                            name:'description',
                            type:'varchar',
                        },
                        {
                            name: 'premium',
                            type: 'boolean'
                        },
                        {
                            name: 'status',
                            type: 'varchar'
                        },
                        {
                            name: 'starts_at',
                            type: 'timestamp with time zone'
                        },
                        {
                            name: 'ends_at',
                            type: 'timestamp with time zone',
                            isNullable: true
                        },
                        {
                            name: 'created_at',
                            type: 'timestamp',
                            default: 'now()'
                        },
                        {
                            name: 'updated_at',
                            type: 'timestamp',
                            default: 'now()'
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('offers')
    }

}
