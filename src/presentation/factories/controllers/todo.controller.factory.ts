import { CreateTodoController } from '../../controllers/create-todo.controller';
import { DeleteTodoController } from '../../controllers/delete-todo.controller';
import { IndexTodoController } from '../../controllers/index-todos.controller';
import { ShowTodoController } from '../../controllers/show-todo.controller';
import { UpdateTodoController } from '../../controllers/update-todo.controller';
import { TodoUsecaseFactory } from '../usecases/todo.usecase.factory';

const {
  createTodoUseCase,
  findOneTodoUsecase,
  findManyTodoUsecase,
  editTodoUsecase,
  removeTodoUsecase,
} = TodoUsecaseFactory.make();

const createTodoController = new CreateTodoController(createTodoUseCase);
const showTodoController = new ShowTodoController(findOneTodoUsecase);
const indexTodoController = new IndexTodoController(findManyTodoUsecase);
const updateTodoController = new UpdateTodoController(editTodoUsecase);
const deleteTodoController = new DeleteTodoController(removeTodoUsecase);

export class TodoControllerFactory {
  static make() {
    return {
      createTodoController,
      showTodoController,
      indexTodoController,
      updateTodoController,
      deleteTodoController,
    };
  }
}
