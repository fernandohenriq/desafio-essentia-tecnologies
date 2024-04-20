import { TaskRepository } from '../../domain/repositories/task.repository';
import { NotFoundError } from '../../utils/app-error';
import { Result } from '../../utils/result';

export namespace RemoveTaskUsecase {
  export type Input = {
    todoId: string;
    taskId: string;
  };
}

export class RemoveTaskUsecase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({ todoId, taskId }: RemoveTaskUsecase.Input): Promise<Result<true, NotFoundError>> {
    const task = await this.taskRepository.findOne({ id: taskId, todoId });
    if (task === null || task === undefined) {
      return Result.failure(new NotFoundError('Task not found'));
    }
    await this.taskRepository.remove(task);
    return Result.success(true);
  }
}
