import { Todo } from '../../../domain/entities/todo.entity';
import { TodoRepository } from '../../../domain/repositories/todo.repository';
import { TypeormManager } from '../typeorm-singleton';

const typeormManager = new TypeormManager();

export class TypeOrmTodoRepository implements TodoRepository {
  private repo = typeormManager.getRepository(Todo);

  async save(todo: Todo): Promise<Todo> {
    const todoSaved = await this.repo.save(todo);
    return todoSaved;
  }

  async findOne(where: Where<Todo>): Promise<Todo | null> {
    const todoFound = await this.repo.findOne({ where });
    if (todoFound === null || todoFound === undefined) {
      return null;
    }
    return todoFound;
  }

  async findMany(search: Search<Todo>): Promise<Todo[]> {
    const { page = 1, limit = 10, orderBy = 'createdAt', sort = 'desc', where = {} } = search ?? {};
    const query = this.repo
      .createQueryBuilder('todo')
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy(`todo.${orderBy}`, sort.toUpperCase() as 'ASC' | 'DESC');
    if (Object.keys(where).length > 0) {
      for (const [key, value] of Object.entries(where)) {
        query.andWhere(`todo.${key} = :${key}`, { [key]: value });
      }
    }
    const todos = await query.getMany();
    return todos;
  }

  async remove(entity: Todo): Promise<void> {
    await this.repo.remove(entity);
    return;
  }
}
