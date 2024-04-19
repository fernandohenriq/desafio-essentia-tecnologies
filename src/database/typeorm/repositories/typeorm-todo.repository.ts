import { Todo } from '../../../domain/entities/todo.entity';
import { TodoRepository } from '../../../domain/repositories/todo.repository';
import { TypeormManager } from '../typeorm-singleton';

const typeormManager = new TypeormManager();

export class TypeOrmTodoRepository implements TodoRepository {
  private repo = typeormManager.getRepository(Todo);

  async save(entity: Todo): Promise<Todo> {
    return await this.repo.save(entity);
  }

  async findById(id: string): Promise<Todo | null> {
    return await this.repo.findOneBy({ id });
  }
}
