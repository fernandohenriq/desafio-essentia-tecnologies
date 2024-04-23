import { Todo } from '../../domain/entities/todo.entity';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { UnprocessableEntityError } from '../../utils/app-error';
import { CreateTodoUseCase } from './create-todo.usecase';

const mockTodoRepository: TodoRepository = {
  save: jest.fn(async (todo: Todo) => todo),
  findOne: jest.fn(),
  findMany: jest.fn(),
  remove: jest.fn(),
};

const createTodoUsecase = new CreateTodoUseCase(mockTodoRepository);

describe('CreateTodoUsecase', () => {
  test('Should be able to create a new todo', async () => {
    const input: CreateTodoUseCase.Input = {
      title: 'Todo 1',
    };

    const todoCreated = (await createTodoUsecase.execute(input)).value;

    expect(todoCreated).toBeInstanceOf(Todo);
    expect(todoCreated.id).toEqual(expect.any(String));
    expect(todoCreated.title).toBe('Todo 1');
    expect(todoCreated.createdAt).toBeInstanceOf(Date);
    expect(todoCreated.updatedAt).toBeNull();
  });

  test('Should not be able to create a new todo with invalid data', async () => {
    const input: CreateTodoUseCase.Input = {
      title: '',
    };

    const todoCreatedError = (await createTodoUsecase.execute(input)).error;

    expect(todoCreatedError).toBeInstanceOf(UnprocessableEntityError);
  });
});
