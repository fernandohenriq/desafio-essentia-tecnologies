import { CreateTodoUseCase } from '../../../application/usecases/create-todo.usecase';
import { EditTodoUsecase } from '../../../application/usecases/edit-todo.usecase';
import { FindManyTodosUsecase } from '../../../application/usecases/find-many-todos.usecase';
import { FindOneTodoUsecase } from '../../../application/usecases/find-one-todo.usecase';
import { RemoveTodoUsecase } from '../../../application/usecases/remove-todo.usecase';
import { TypeOrmTodoRepository } from '../../../database/typeorm/repositories/typeorm-todo.repository';

const todoRepository = new TypeOrmTodoRepository();

const createTodoUseCase = new CreateTodoUseCase(todoRepository);
const findOneTodoUsecase = new FindOneTodoUsecase(todoRepository);
const findManyTodoUsecase = new FindManyTodosUsecase(todoRepository);
const editTodoUsecase = new EditTodoUsecase(todoRepository);
const removeTodoUsecase = new RemoveTodoUsecase(todoRepository);

export class TodoUsecaseFactory {
  static make() {
    return {
      createTodoUseCase,
      findOneTodoUsecase,
      findManyTodoUsecase,
      editTodoUsecase,
      removeTodoUsecase,
    };
  }
}
