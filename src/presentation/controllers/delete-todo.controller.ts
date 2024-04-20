import { RemoveTodoUsecase } from '../../application/usecases/remove-todo.usecase';

export class DeleteTodoController {
  constructor(private readonly removeTodoUsecase: RemoveTodoUsecase) {}

  handle: HttpHandler = async (req, res, next) => {
    try {
      const input: RemoveTodoUsecase.Input = {
        todoId: req?.params?.todoId,
      };
      const todoResult = await this.removeTodoUsecase.execute(input);
      if (todoResult.isFailure) throw todoResult.error;
      res.status(200).send({
        message: 'Todo removed successfully',
      });
    } catch (error: unknown) {
      next(error);
    }
  };
}
