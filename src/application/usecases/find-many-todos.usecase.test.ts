import { Todo } from '../../domain/entities/todo.entity';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { FindManyTodosUsecase } from './find-many-todos.usecase';

let mockDb: Record<string, any> = {};

const mockTodoRepository: TodoRepository = {
  save: jest.fn(),
  findOne: jest.fn(),
  findMany: jest.fn(async (search: Search<Todo>) => {
    const { page = 1, limit = 10, where = {} } = search ?? {};
    const todos = mockDb.todos
      .filter((todo: Todo) => Object.entries(where).every(([key, value]) => todo[key] === value))
      .slice((page - 1) * limit, page * limit);
    return todos.map((todo: any) => new Todo(todo));
  }),
  remove: jest.fn(),
};

const findOneTodoUsecase = new FindManyTodosUsecase(mockTodoRepository);

describe('FindManyTodosUsecase', () => {
  beforeEach(() => {
    mockDb = {
      todos: [
        {
          id: '92f55b56-e071-458e-b321-8179e851854a',
          title: 'Todo 1',
          createdAt: new Date(),
          updatedAt: null,
        },
        {
          id: '92f55b56-e071-458e-b321-8179e851854b',
          title: 'Todo 2',
          createdAt: new Date(),
          updatedAt: null,
        },
      ],
    };
  });

  test('Should be able to find many todos', async () => {
    const todos = (await findOneTodoUsecase.execute({ page: 1, limit: 10 })).value;

    expect(todos).toHaveLength(2);
    expect(todos[0]).toBeInstanceOf(Todo);
    expect(todos[1]).toBeInstanceOf(Todo);

    expect((await findOneTodoUsecase.execute({ page: 2, limit: 2 })).value).toHaveLength(0);
    expect((await findOneTodoUsecase.execute({ page: 1, limit: 2 })).value).toHaveLength(2);
    expect(
      (await findOneTodoUsecase.execute({ where: { title: 'non-existing' } })).value,
    ).toHaveLength(0);
  });
});
