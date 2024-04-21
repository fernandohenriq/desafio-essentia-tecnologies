import { Task } from '../../domain/entities/task.entity';
import { TaskRepository } from '../../domain/repositories/task.repository';
import { NotFoundError } from '../../utils/app-error';
import { Result } from '../../utils/result';

export namespace FindManyTasksUsecase {}

export class FindManyTasksUsecase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(search: Search<Task> = {}): Promise<Result<Task[], NotFoundError>> {
    const tasks = await this.taskRepository.findMany(search);
    return Result.success(tasks);
  }
}
