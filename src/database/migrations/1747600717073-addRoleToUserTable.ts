import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleToUserTable1747600717073 implements MigrationInterface {
    name = 'AddRoleToUserTable1747600717073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying DEFAULT 'MEMBER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    }

}
