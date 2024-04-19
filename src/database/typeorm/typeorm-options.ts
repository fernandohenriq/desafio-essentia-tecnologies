import { DataSourceOptions } from 'typeorm';

export const typeormOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  dropSchema: true,
  synchronize: true,
  logging: false,
  entities: ['src/**/*.entity.{ts,js}'],
};
