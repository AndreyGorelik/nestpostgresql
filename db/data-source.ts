import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'postgres',
  entities: ['dist/**/*.entity{.js,.ts}'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
