import { Task } from '../../domain/entities/task.entity';
import { TaskRepository } from '../../domain/repositories/task.repository';
import { NotFoundError } from '../../utils/app-error';
import { Result } from '../../utils/result';

export namespace EditTaskUsecase {
  export type Input = {
    todoId: string;
    taskId: string;
    data: Task.UpdateTaskProps;
  };
}

export class EditTaskUsecase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({
    todoId,
    taskId,
    data,
  }: EditTaskUsecase.Input): Promise<Result<Task, NotFoundError>> {
    const task = await this.taskRepository.findOne({ id: taskId, todoId });
    if (task === null || task === undefined) {
      return Result.failure(new NotFoundError('Task not found'));
    }
    const taskUpdatedResult = task.update(data);
    if (taskUpdatedResult.isFailure) {
      return Result.failure(taskUpdatedResult.error);
    }
    const taskUpdated = taskUpdatedResult.value;
    await this.taskRepository.save(taskUpdated);
    return Result.success(taskUpdated);
  }
}
