import { EditTodoUsecase } from '../../application/usecases/edit-todo.usecase';

export class UpdateTodoController {
  constructor(private readonly editTodoUsecase: EditTodoUsecase) {}

  handle: HttpHandler = async (req, res, next) => {
    try {
      const input: EditTodoUsecase.Input = {
        todoId: req?.params?.todoId,
        data: req?.body,
      };
      const todoResult = await this.editTodoUsecase.execute(input);
      if (todoResult.isFailure) throw todoResult.error;
      const todo = todoResult.value;
      res.status(200).send({
        message: 'Todo updated successfully',
        todo,
      });
    } catch (error: unknown) {
      next(error);
    }
  };
}
