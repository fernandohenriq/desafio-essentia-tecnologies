import { Todo } from '../../domain/entities/todo.entity';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { NotFoundError } from '../../utils/app-error';
import { FindOneTodoUsecase } from './find-one-todo.usecase';

const todoId = '92f55b56-e071-458e-b321-8179e851854a';

let mockDb: Record<string, any> = {};

const mockTodoRepository: TodoRepository = {
  save: jest.fn(),
  findOne: jest.fn(async ({ id }) => {
    const todo = mockDb.todos.find((todo: Todo) => todo.id === id);
    return !!todo ? new Todo(todo) : null;
  }),
  findMany: jest.fn(),
  remove: jest.fn(),
};

const findOneTodoUsecase = new FindOneTodoUsecase(mockTodoRepository);

describe('FindOneTodoUsecase', () => {
  beforeEach(() => {
    mockDb = {
      todos: [
        {
          id: todoId,
          title: 'Todo 1',
          createdAt: new Date(),
          updatedAt: null,
        },
      ],
    };
  });

  test('Should be able to find a todo', async () => {
    const input: FindOneTodoUsecase.Input = {
      todoId,
    };

    const todoFound = (await findOneTodoUsecase.execute(input)).value;

    expect(todoFound).toBeInstanceOf(Todo);
    expect(todoFound.id).toEqual(todoId);
  });

  test('Should not be able to find a todo with non-existing id', async () => {
    const input: FindOneTodoUsecase.Input = {
      todoId: 'non-existing-id',
    };

    const todoFoundError = (await findOneTodoUsecase.execute(input)).error;

    expect(todoFoundError).toBeInstanceOf(NotFoundError);
    expect(todoFoundError.message).toBe('Todo not found');
  });
});
