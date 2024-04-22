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
    const todos = await this.repo.find({
      skip: (page - 1) * limit,
      take: limit,
      order: { [orderBy]: sort },
      where: where,
    });
    return todos;
  }

  async remove(entity: Todo): Promise<void> {
    await this.repo.remove(entity);
    return;
  }
}
