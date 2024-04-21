import { Todo } from '../../domain/entities/todo.entity';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { NotFoundError } from '../../utils/app-error';
import { Result } from '../../utils/result';

export namespace FindOneTodoUsecase {
  export type Input = {
    todoId: string;
  };
}

export class FindOneTodoUsecase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute({ todoId }: FindOneTodoUsecase.Input): Promise<Result<Todo, NotFoundError>> {
    const todo = await this.todoRepository.findOne({ id: todoId });
    if (todo === null || todo === undefined) {
      return Result.failure(new NotFoundError('Todo not found'));
    }
    return Result.success(todo);
  }
}
