import { TodoRepository } from '../../domain/repositories/todo.repository';
import { NotFoundError } from '../../utils/app-error';
import { Result } from '../../utils/result';

export namespace RemoveTodoUsecase {
  export type Input = {
    todoId: string;
  };
}

export class RemoveTodoUsecase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute({ todoId }: RemoveTodoUsecase.Input): Promise<Result<true, NotFoundError>> {
    const todo = await this.todoRepository.findOne({ id: todoId });
    if (todo === null || todo === undefined) {
      return Result.failure(new NotFoundError('Todo not found'));
    }
    await this.todoRepository.remove(todo);
    return Result.success(true);
  }
}
