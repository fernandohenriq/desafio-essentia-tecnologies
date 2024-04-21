import { FindManyTasksUsecase } from '../../application/usecases/find-many-tasks.usecase';
import { Task } from '../../domain/entities/task.entity';
import { extractQuerySearch } from '../../utils/extract-query-search';

export class IndexTaskController {
  constructor(private readonly findManyTaskUsecase: FindManyTasksUsecase) {}

  handle: HttpHandler = async (req, res, next) => {
    try {
      const todoId = req?.params?.todoId;
      req.query.todoId = todoId;
      const search: Search<Task> = extractQuerySearch(req.query);
      const tasksResult = await this.findManyTaskUsecase.execute(search);
      if (tasksResult.isFailure) throw tasksResult.error;
      const tasks = tasksResult.value;
      res.status(200).send({
        message: 'Tasks found successfully',
        tasks,
      });
    } catch (error: unknown) {
      next(error);
    }
  };
}
