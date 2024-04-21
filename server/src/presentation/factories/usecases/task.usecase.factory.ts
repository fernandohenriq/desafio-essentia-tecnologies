import { CreateTaskUseCase } from '../../../application/usecases/create-task.usecase';
import { EditTaskUsecase } from '../../../application/usecases/edit-task.usecase';
import { FindManyTasksUsecase } from '../../../application/usecases/find-many-tasks.usecase';
import { FindOneTaskUsecase } from '../../../application/usecases/find-one-task.usecase';
import { RemoveTaskUsecase } from '../../../application/usecases/remove-task.usecase';
import { TypeOrmTaskRepository } from '../../../database/typeorm/repositories/typeorm-task.repository';
import { TypeOrmTodoRepository } from '../../../database/typeorm/repositories/typeorm-todo.repository';

const todoRepository = new TypeOrmTodoRepository();
const taskRepository = new TypeOrmTaskRepository();

const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const findOneTaskUsecase = new FindOneTaskUsecase(todoRepository, taskRepository);
const findManyTaskUsecase = new FindManyTasksUsecase(taskRepository);
const editTaskUsecase = new EditTaskUsecase(taskRepository);
const removeTaskUsecase = new RemoveTaskUsecase(taskRepository);

export class TaskUsecaseFactory {
  static make() {
    return {
      createTaskUseCase,
      findOneTaskUsecase,
      findManyTaskUsecase,
      editTaskUsecase,
      removeTaskUsecase,
    };
  }
}
