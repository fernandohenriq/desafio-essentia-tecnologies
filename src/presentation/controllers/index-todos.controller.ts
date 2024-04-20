import { FindManyTodosUsecase } from '../../application/usecases/find-many-todos.usecase';
import { Todo } from '../../domain/entities/todo.entity';

export class IndexTodoController {
  constructor(private readonly findManyTodoUsecase: FindManyTodosUsecase) {}

  handle: HttpHandler = async (req, res, next) => {
    try {
      const search: Search<Todo> = req.query;
      const todosResult = await this.findManyTodoUsecase.execute(search);
      if (todosResult.isFailure) throw todosResult.error;
      const todos = todosResult.value;
      res.status(200).send({
        message: 'Todos found successfully',
        todos,
      });
    } catch (error: unknown) {
      next(error);
    }
  };
}
