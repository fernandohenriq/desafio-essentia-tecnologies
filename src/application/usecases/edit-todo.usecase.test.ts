import { Todo } from '../../domain/entities/todo.entity';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { NotFoundError, UnprocessableEntityError } from '../../utils/app-error';
import { EditTodoUsecase } from './edit-todo.usecase';

const todoId = '92f55b56-e071-458e-b321-8179e851854a';

let mockDb: Record<string, any> = {};

const mockTodoRepository: TodoRepository = {
  save: jest.fn(async (todo: Todo) => {
    mockDb.todos.push(todo);
    return todo;
  }),
  findOne: jest.fn(async ({ id }) => {
    const todo = mockDb.todos.find((todo: Todo) => todo.id === id);
    return !!todo ? new Todo(todo) : null;
  }),
  findMany: jest.fn(),
  remove: jest.fn(),
};

const editTodoUsecase = new EditTodoUsecase(mockTodoRepository);

describe('EditTodoUsecase', () => {
  beforeEach(() => {
    mockDb = {
      todos: [
        {
          id: todoId,
          title: 'Todo 1',
          isCompleted: false,
          createdAt: new Date(),
          updatedAt: null,
        },
      ],
    };
  });

  test('Should be able to edit a existing todo', async () => {
    const input: EditTodoUsecase.Input = {
      todoId,
      data: {
        title: 'Todo 1 updated',
        isCompleted: true,
      },
    };

    const todoUpdated = (await editTodoUsecase.execute(input)).value;

    expect(todoUpdated).toBeInstanceOf(Todo);
    expect(todoUpdated.id).toEqual(todoId);
    expect(todoUpdated.title).toBe('Todo 1 updated');
    expect(todoUpdated.isCompleted).toBe(true);
    expect(todoUpdated.createdAt).toBeTruthy();
    expect(todoUpdated.updatedAt).toBeTruthy();
  });

  test('Should not be able to edit a non-existing todo id', async () => {
    const input: EditTodoUsecase.Input = {
      todoId: 'non-existing-todo-id',
      data: {
        title: 'Todo 1 updated',
        isCompleted: true,
      },
    };

    const todoUpdatedError = (await editTodoUsecase.execute(input)).error;

    expect(todoUpdatedError).toBeInstanceOf(NotFoundError);
    expect(todoUpdatedError.message).toBe('Todo not found');
  });

  test('Should not be able to edit a todo with invalid data', async () => {
    const input: EditTodoUsecase.Input = {
      todoId,
      data: {
        title: '',
        isCompleted: null as any,
      },
    };

    const todoUpdatedError = (await editTodoUsecase.execute(input)).error;

    expect(todoUpdatedError).toBeInstanceOf(UnprocessableEntityError);
  });
});
