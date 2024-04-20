import { CreateTaskUseCase } from '../../application/usecases/create-task.usecase';

export class CreateTaskController {
  constructor(private readonly createTaskUsecase: CreateTaskUseCase) {}

  handle: HttpHandler = async (req, res, next) => {
    try {
      const { todoId } = req.params;
      const input: CreateTaskUseCase.Input = {
        ...req.body,
        todoId,
      };
      const taskResult = await this.createTaskUsecase.execute(input);
      if (taskResult.isFailure) throw taskResult.error;
      const task = taskResult.value;
      res.status(201).send({
        message: 'Task created successfully',
        task,
      });
    } catch (error: unknown) {
      next(error);
    }
  };
}
