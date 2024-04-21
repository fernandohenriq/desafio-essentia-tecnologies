import { FindManyOptions } from 'typeorm';

import { Task } from '../../../domain/entities/task.entity';
import { TaskRepository } from '../../../domain/repositories/task.repository';
import { TypeormManager } from '../typeorm-singleton';

const typeormManager = new TypeormManager();

export class TypeOrmTaskRepository implements TaskRepository {
  private repo = typeormManager.getRepository(Task);

  async save(task: Task): Promise<Task> {
    const taskSaved = await this.repo.save(task);
    return taskSaved;
  }

  async findOne(where: Where<Task>): Promise<Task | null> {
    const taskFound = await this.repo.findOne({ where });
    if (taskFound === null || taskFound === undefined) {
      return null;
    }
    return taskFound;
  }

  async findMany(search: Search<Task>): Promise<Task[]> {
    const { page = 1, limit = 10, orderBy = 'createdAt', sort = 'desc', where = {} } = search ?? {};
    const tasks = await this.repo.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { [orderBy]: sort },
      where: where,
    });
    return tasks;
  }

  async remove(entity: Task): Promise<void> {
    await this.repo.remove(entity);
    return;
  }
}
