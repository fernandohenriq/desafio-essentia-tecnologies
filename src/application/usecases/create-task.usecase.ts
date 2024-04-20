import { Task } from '../../domain/entities/task.entity';
import { TaskRepository } from '../../domain/repositories/task.repository';
import { AppError } from '../../utils/app-error';
import { Result } from '../../utils/result';

export namespace CreateTaskUseCase {
  export type Input = Task.CreateTaskProps;
}

export class CreateTaskUseCase {
  constructor(private readonly repository: TaskRepository) {}

  async execute(input: CreateTaskUseCase.Input): Promise<Result<Task, AppError>> {
    const taskResult = Task.create(input);
    if (taskResult.isFailure) {
      return taskResult;
    }
    const task = taskResult.value;
    await this.repository.save(task);
    return Result.success(task);
  }
}
