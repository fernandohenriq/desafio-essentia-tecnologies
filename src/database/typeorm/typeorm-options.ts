import { DataSourceOptions } from 'typeorm';

const NODE_ENV = process.env.NODE_ENV || 'development';

export const typeormOptions: DataSourceOptions = (() => {
  const DB_TYPE = process.env.DB_TYPE || 'mysql';
  const DB_HOST = process.env.DB_HOST || 'localhost';
  const DB_PORT = process.env.DB_PORT || '3306';
  const DB_USERNAME = process.env.DB_USERNAME;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  const DB_NAME = process.env.DB_NAME || 'postgres';

  switch (NODE_ENV) {
    case 'production':
      return {
        type: DB_TYPE as any,
        host: DB_HOST,
        port: Number(DB_PORT),
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        synchronize: false,
        logging: false,
        entities: ['dist/**/*.entity.{ts,js}'],
      };
    default:
      return {
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        synchronize: true,
        logging: false,
        entities: ['src/**/*.entity.{ts,js}'],
      };
  }
})();
