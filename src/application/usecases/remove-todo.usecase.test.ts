import { Todo } from '../../domain/entities/todo.entity';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { NotFoundError } from '../../utils/app-error';
import { RemoveTodoUsecase } from './remove-todo.usecase';

const todoId = '92f55b56-e071-458e-b321-8179e851854a';

let mockDb: Record<string, any> = {};

const mockTodoRepository: TodoRepository = {
  save: jest.fn(),
  findOne: jest.fn(async ({ id }) => {
    const todo = mockDb.todos.find((todo: Todo) => todo.id === id);
    return !!todo ? new Todo(todo) : null;
  }),
  findMany: jest.fn(),
  remove: jest.fn(async ({ id }) => {
    mockDb.todos = mockDb.todos.filter((todo: Todo) => todo.id !== id);
  }),
};

const removeTodoUsecase = new RemoveTodoUsecase(mockTodoRepository);

describe('Should be able to remove a todo', () => {
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

  test('Should be able to remove an existing todo', async () => {
    const input: RemoveTodoUsecase.Input = {
      todoId,
    };

    await removeTodoUsecase.execute(input);

    expect(mockDb.todos).toHaveLength(0);
  });

  test('Should not be able to remove a non-existing todo', async () => {
    const input: RemoveTodoUsecase.Input = {
      todoId: 'non-existing-id',
    };

    const todoRemovedError = (await removeTodoUsecase.execute(input)).error;

    expect(todoRemovedError).toBeInstanceOf(NotFoundError);
  });
});
