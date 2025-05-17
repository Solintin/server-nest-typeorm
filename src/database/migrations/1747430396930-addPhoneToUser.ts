import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhoneToUser1747430396930 implements MigrationInterface {
    name = 'AddPhoneToUser1747430396930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phoneNumber" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phoneNumber"`);
    }

}
