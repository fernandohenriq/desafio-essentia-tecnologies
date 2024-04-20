import { CreateTodoUseCase } from '../../application/usecases/create-todo.usecase';

export class CreateTodoController {
  constructor(private readonly createTodoUsecase: CreateTodoUseCase) {}

  handle: HttpHandler = async (req, res, next) => {
    try {
      const input: CreateTodoUseCase.Input = req.body;
      const todoResult = await this.createTodoUsecase.execute(input);
      if (todoResult.isFailure) throw todoResult.error;
      const todo = todoResult.value;
      res.status(201).send({
        message: 'Todo created successfully',
        todo,
      });
    } catch (error: unknown) {
      next(error);
    }
  };
}
