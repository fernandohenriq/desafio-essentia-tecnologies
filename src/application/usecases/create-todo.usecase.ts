import { Todo } from '../../domain/entities/todo.entity';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { AppError } from '../../utils/app-error';
import { Result } from '../../utils/result';

export namespace CreateTodoUseCase {
  export type Input = Todo.CreateTodoProps;
}

export class CreateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  async execute(input: CreateTodoUseCase.Input): Promise<Result<Todo, AppError>> {
    const todoResult = Todo.create(input);
    if (todoResult.isFailure) {
      return todoResult;
    }
    const todo = todoResult.value;
    await this.repository.save(todo);
    return Result.success(todo);
  }
}
