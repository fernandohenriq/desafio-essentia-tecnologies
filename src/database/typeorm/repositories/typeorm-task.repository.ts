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
    const query = this.repo
      .createQueryBuilder('task')
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy(`task.${orderBy}`, sort.toUpperCase() as 'ASC' | 'DESC');
    if (Object.keys(where).length > 0) {
      for (const [key, value] of Object.entries(where)) {
        query.andWhere(`task.${key} = :${key}`, { [key]: value });
      }
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async remove(entity: Task): Promise<void> {
    await this.repo.remove(entity);
    return;
  }
}
