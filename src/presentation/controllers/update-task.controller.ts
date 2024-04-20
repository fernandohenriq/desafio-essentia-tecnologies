import { EditTaskUsecase } from '../../application/usecases/edit-task.usecase';

export class UpdateTaskController {
  constructor(private readonly editTaskUsecase: EditTaskUsecase) {}

  handle: HttpHandler = async (req, res, next) => {
    try {
      const input: EditTaskUsecase.Input = {
        todoId: req?.params?.todoId,
        taskId: req?.params?.taskId,
        data: req?.body,
      };
      const taskResult = await this.editTaskUsecase.execute(input);
      if (taskResult.isFailure) throw taskResult.error;
      const task = taskResult.value;
      res.status(200).send({
        message: 'Task updated successfully',
        task,
      });
    } catch (error: unknown) {
      next(error);
    }
  };
}
