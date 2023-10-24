import { MigrationInterface, QueryRunner } from "typeorm";

export class UserPet1698152423353 implements MigrationInterface {
    name = 'UserPet1698152423353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, "email" character varying(30) NOT NULL, "password" character varying(30) NOT NULL, "surname" character varying(30) NOT NULL, "pet" character varying(30) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
