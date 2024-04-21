import { Task } from '../../domain/entities/task.entity';
import { Todo } from '../../domain/entities/todo.entity';
import { TaskRepository } from '../../domain/repositories/task.repository';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { NotFoundError } from '../../utils/app-error';
import { FindOneTaskUsecase } from './find-one-task.usecase';

const taskId = 'ad2e9529-80a5-4d29-a7e7-12f7297957e1';
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

const mockTaskRepository: TaskRepository = {
  save: jest.fn(),
  findOne: jest.fn(async ({ id }) => {
    const task = mockDb.tasks.find((task: Task) => task.id === id);
    return !!task ? new Task(task) : null;
  }),
  findMany: jest.fn(),
  remove: jest.fn(),
};

const findOneTaskUsecase = new FindOneTaskUsecase(mockTodoRepository, mockTaskRepository);

describe('FindOneTaskUsecase', () => {
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
      tasks: [
        {
          id: taskId,
          title: 'Task 1',
          createdAt: new Date(),
          updatedAt: null,
        },
      ],
    };
  });

  test('Should be able to find a task', async () => {
    const input: FindOneTaskUsecase.Input = {
      todoId,
      taskId,
    };

    const taskFound = (await findOneTaskUsecase.execute(input)).value;

    expect(taskFound).toBeInstanceOf(Task);
    expect(taskFound.id).toEqual(taskId);
  });

  test('Should not be able to find a task with non-existing id', async () => {
    const input: FindOneTaskUsecase.Input = {
      todoId,
      taskId: 'non-existing-id',
    };

    const taskFoundError = (await findOneTaskUsecase.execute(input)).error;

    expect(taskFoundError).toBeInstanceOf(NotFoundError);
    expect(taskFoundError.message).toBe('Task not found');
  });

  test('Should not be able to find a task with non-existing todo id', async () => {
    const input: FindOneTaskUsecase.Input = {
      todoId: 'non-existing-todo-id',
      taskId,
    };

    const taskFoundError = (await findOneTaskUsecase.execute(input)).error;

    expect(taskFoundError).toBeInstanceOf(NotFoundError);
    expect(taskFoundError.message).toBe('Todo not found');
  });
});
