import { FindOneTodoUsecase } from '../../application/usecases/find-one-todo.usecase';

export class ShowTodoController {
  constructor(private readonly findOneTodoUsecase: FindOneTodoUsecase) {}

  handle: HttpHandler = async (req, res, next) => {
    try {
      const input: FindOneTodoUsecase.Input = {
        todoId: req?.params?.todoId,
      };
      const todoResult = await this.findOneTodoUsecase.execute(input);
      if (todoResult.isFailure) throw todoResult.error;
      const todo = todoResult.value;
      res.status(200).send({
        message: 'Todo found successfully',
        todo,
      });
    } catch (error: unknown) {
      next(error);
    }
  };
}
