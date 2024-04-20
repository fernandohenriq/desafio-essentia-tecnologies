import { FindManyTasksUsecase } from '../../application/usecases/find-many-tasks.usecase';

export class IndexTaskController {
  constructor(private readonly findManyTaskUsecase: FindManyTasksUsecase) {}

  handle: HttpHandler = async (req, res, next) => {
    try {
      const todoId = req?.params?.todoId;
      const queries = req?.query ?? {};
      const tasksResult = await this.findManyTaskUsecase.execute({
        ...queries,
        where: {
          ...(queries?.where ?? {}),
          todoId,
        },
      });
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
