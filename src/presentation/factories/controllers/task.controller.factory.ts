import { CreateTaskController } from '../../controllers/create-task.controller';
import { DeleteTaskController } from '../../controllers/delete-task.controller';
import { IndexTaskController } from '../../controllers/index-tasks.controller';
import { ShowTaskController } from '../../controllers/show-task.controller';
import { UpdateTaskController } from '../../controllers/update-task.controller';
import { TaskUsecaseFactory } from '../usecases/task.usecase.factory';

const {
  createTaskUseCase,
  findOneTaskUsecase,
  findManyTaskUsecase,
  editTaskUsecase,
  removeTaskUsecase,
} = TaskUsecaseFactory.make();

const createTaskController = new CreateTaskController(createTaskUseCase);
const showTaskController = new ShowTaskController(findOneTaskUsecase);
const indexTaskController = new IndexTaskController(findManyTaskUsecase);
const updateTaskController = new UpdateTaskController(editTaskUsecase);
const deleteTaskController = new DeleteTaskController(removeTaskUsecase);

export class TaskControllerFactory {
  static make() {
    return {
      createTaskController,
      showTaskController,
      indexTaskController,
      updateTaskController,
      deleteTaskController,
    };
  }
}
