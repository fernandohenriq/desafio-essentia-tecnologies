import { Todo } from '../../domain/entities/todo.entity';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { NotFoundError } from '../../utils/app-error';
import { Result } from '../../utils/result';

export namespace FindManyTodosUsecase {}

export class FindManyTodosUsecase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(search: Search<Todo> = {}): Promise<Result<Todo[], NotFoundError>> {
    const todos = await this.todoRepository.findMany(search);
    return Result.success(todos);
  }
}
