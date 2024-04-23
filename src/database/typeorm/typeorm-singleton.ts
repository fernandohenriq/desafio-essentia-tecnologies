import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';

import { typeormOptions } from './typeorm-options';

export type SeedDatabase = {
  [tableName: string]: Array<{ [column: string]: any }>;
};

const typeorm = new DataSource(typeormOptions);

export class TypeormManager {
  private static instance: TypeormManager;

  constructor() {
    if (TypeormManager.instance) {
      return TypeormManager.instance;
    }
    TypeormManager.instance = this;
  }

  async initialize() {
    if (typeorm.isInitialized) {
      throw new Error('DataSource is already initialized');
    }
    await typeorm.initialize();
  }

  async close() {
    if (!typeorm || !typeorm.isInitialized) {
      throw new Error('Not possible to close dataSource, because it is not initialized');
    }
    await typeorm.destroy();
  }

  async seed(seed: SeedDatabase): Promise<void> {
    try {
      if (!typeorm || !typeorm.isInitialized) {
        throw new Error('Not possible to seed dataSource, because it is not initialized');
      }
      const entities = typeorm.entityMetadatas;
      for (const entity of entities) {
        const repository = typeorm.getRepository(entity.name);
        await repository.insert(seed[entity.tableName] ?? []);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  getRepository<Entity extends ObjectLiteral>(target: EntityTarget<Entity>): Repository<Entity> {
    return typeorm.getRepository(target);
  }
}
