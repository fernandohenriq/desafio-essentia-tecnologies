import { RemoveTaskUsecase } from '../../application/usecases/remove-task.usecase';

export class DeleteTaskController {
  constructor(private readonly removeTaskUsecase: RemoveTaskUsecase) {}

  handle: HttpHandler = async (req, res, next) => {
    try {
      const input: RemoveTaskUsecase.Input = {
        todoId: req?.params?.todoId,
        taskId: req?.params?.taskId,
      };
      const taskResult = await this.removeTaskUsecase.execute(input);
      if (taskResult.isFailure) throw taskResult.error;
      res.status(200).send({
        message: 'Task removed successfully',
      });
    } catch (error: unknown) {
      next(error);
    }
  };
}
