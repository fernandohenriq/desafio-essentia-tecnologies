import { FindOneTaskUsecase } from '../../application/usecases/find-one-task.usecase';

export class ShowTaskController {
  constructor(private readonly findOneTaskUsecase: FindOneTaskUsecase) {}

  handle: HttpHandler = async (req, res, next) => {
    try {
      const input: FindOneTaskUsecase.Input = {
        todoId: req?.params?.todoId,
        taskId: req?.params?.taskId,
      };
      const taskResult = await this.findOneTaskUsecase.execute(input);
      if (taskResult.isFailure) throw taskResult.error;
      const task = taskResult.value;
      res.status(200).send({
        message: 'Task found successfully',
        task,
      });
    } catch (error: unknown) {
      next(error);
    }
  };
}
