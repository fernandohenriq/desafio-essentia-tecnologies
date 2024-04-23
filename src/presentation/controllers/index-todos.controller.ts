import { FindManyTodosUsecase } from '../../application/usecases/find-many-todos.usecase';
import { Todo } from '../../domain/entities/todo.entity';
import { extractQuerySearch } from '../../utils/extract-query-search';

export class IndexTodoController {
  constructor(private readonly findManyTodoUsecase: FindManyTodosUsecase) {}

  handle: HttpHandler = async (req, res, next) => {
    try {
      const search: Search<Todo> = extractQuerySearch(req.query);
      const todosResult = await this.findManyTodoUsecase.execute(search);
      if (todosResult.isFailure) throw todosResult.error;
      const data = todosResult.value;
      res.status(200).send({
        message: 'Todos found successfully',
        data,
      });
    } catch (error: unknown) {
      next(error);
    }
  };
}
