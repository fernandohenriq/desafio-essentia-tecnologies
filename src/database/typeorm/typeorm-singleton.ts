import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';

import { typeormOptions } from './typeorm-options';

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
    await typeorm.initialize();
  }

  async close() {
    await typeorm.destroy();
  }

  getRepository<Entity extends ObjectLiteral>(target: EntityTarget<Entity>): Repository<Entity> {
    return typeorm.getRepository(target);
  }
}
