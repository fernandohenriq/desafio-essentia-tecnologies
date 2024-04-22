import { Todo } from '../../domain/entities/todo.entity';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { NotFoundError } from '../../utils/app-error';
import { Result } from '../../utils/result';

export namespace EditTodoUsecase {
  export type Input = {
    todoId: string;
    data: Todo.UpdateTodoProps;
  };
}

export class EditTodoUsecase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute({ todoId, data }: EditTodoUsecase.Input): Promise<Result<Todo, NotFoundError>> {
    const todo = await this.todoRepository.findOne({ id: todoId });
    if (todo === null || todo === undefined) {
      return Result.failure(new NotFoundError('Todo not found'));
    }
    const todoUpdatedResult = todo.update(data);
    if (todoUpdatedResult.isFailure) {
      return Result.failure(todoUpdatedResult.error);
    }
    const todoUpdated = todoUpdatedResult.value;
    await this.todoRepository.save(todoUpdated);
    return Result.success(todoUpdated);
  }
}
