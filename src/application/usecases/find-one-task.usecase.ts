import { Task } from '../../domain/entities/task.entity';
import { TaskRepository } from '../../domain/repositories/task.repository';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { NotFoundError } from '../../utils/app-error';
import { Result } from '../../utils/result';

export namespace FindOneTaskUsecase {
  export type Input = {
    todoId: string;
    taskId: string;
  };
}

export class FindOneTaskUsecase {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute({
    todoId,
    taskId,
  }: FindOneTaskUsecase.Input): Promise<Result<Task, NotFoundError>> {
    const todo = await this.todoRepository.findOne({ id: todoId });
    if (todo === null || todo === undefined) {
      return Result.failure(new NotFoundError('Todo not found'));
    }
    const task = await this.taskRepository.findOne({ id: taskId, todoId });
    if (task === null || task === undefined) {
      return Result.failure(new NotFoundError('Task not found'));
    }
    return Result.success(task);
  }
}
