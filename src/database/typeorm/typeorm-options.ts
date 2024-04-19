import { DataSourceOptions } from 'typeorm';

import { Todo } from '../../domain/entities/todo.entity';

export const typeormOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  dropSchema: true,
  synchronize: true,
  logging: false,
  entities: [Todo],
};
