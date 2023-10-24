import { MigrationInterface, QueryRunner } from "typeorm";

export class UserDefaultt1698149021168 implements MigrationInterface {
    name = 'UserDefaultt1698149021168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(30) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    }

}
