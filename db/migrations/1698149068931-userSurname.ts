import { MigrationInterface, QueryRunner } from "typeorm";

export class UserSurname1698149068931 implements MigrationInterface {
    name = 'UserSurname1698149068931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "surname" character varying(30) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "surname"`);
    }

}
