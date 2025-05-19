import { MigrationInterface, QueryRunner } from "typeorm";

export class UserNameToBeNullable1747569248233 implements MigrationInterface {
    name = 'UserNameToBeNullable1747569248233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL`);
    }

}
