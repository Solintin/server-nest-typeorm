import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1747429834989 implements MigrationInterface {
    name = 'AutoMigration1747429834989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quiz_settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "timeLimit" integer NOT NULL DEFAULT '60', "shuffleQuestions" boolean NOT NULL DEFAULT false, "showResults" boolean NOT NULL DEFAULT false, "attemptAllowed" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_74f9b8635d0ce9f2dd95b3a15fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quizzes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "settingsId" uuid, CONSTRAINT "REL_400a7be4d9f636c1a5cf92059e" UNIQUE ("settingsId"), CONSTRAINT "PK_b24f0f7662cf6b3a0e7dba0a1b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "question" character varying NOT NULL, "answer" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "quizId" uuid, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questions_tags_tags" ("questionsId" uuid NOT NULL, "tagsId" uuid NOT NULL, CONSTRAINT "PK_6c1ea3a815ea62263aaf7cfcd80" PRIMARY KEY ("questionsId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_91353dfa02de18aeab04ef3a60" ON "questions_tags_tags" ("questionsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ebfd7ef95ffa54c9997580c8d2" ON "questions_tags_tags" ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "quizzes" ADD CONSTRAINT "FK_400a7be4d9f636c1a5cf92059e8" FOREIGN KEY ("settingsId") REFERENCES "quiz_settings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_35d54f06d12ea78d4842aed6b6d" FOREIGN KEY ("quizId") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions_tags_tags" ADD CONSTRAINT "FK_91353dfa02de18aeab04ef3a60e" FOREIGN KEY ("questionsId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "questions_tags_tags" ADD CONSTRAINT "FK_ebfd7ef95ffa54c9997580c8d27" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions_tags_tags" DROP CONSTRAINT "FK_ebfd7ef95ffa54c9997580c8d27"`);
        await queryRunner.query(`ALTER TABLE "questions_tags_tags" DROP CONSTRAINT "FK_91353dfa02de18aeab04ef3a60e"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_35d54f06d12ea78d4842aed6b6d"`);
        await queryRunner.query(`ALTER TABLE "quizzes" DROP CONSTRAINT "FK_400a7be4d9f636c1a5cf92059e8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ebfd7ef95ffa54c9997580c8d2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_91353dfa02de18aeab04ef3a60"`);
        await queryRunner.query(`DROP TABLE "questions_tags_tags"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TABLE "quizzes"`);
        await queryRunner.query(`DROP TABLE "quiz_settings"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
