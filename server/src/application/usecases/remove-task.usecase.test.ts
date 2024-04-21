import { Task } from '../../domain/entities/task.entity';
import { TaskRepository } from '../../domain/repositories/task.repository';
import { NotFoundError } from '../../utils/app-error';
import { RemoveTaskUsecase } from './remove-task.usecase';

const todoId = '92f55b56-e071-458e-b321-8179e851854a';
const taskId = 'ad2e9529-80a5-4d29-a7e7-12f7297957e1';

let mockDb: Record<string, any> = {};

const mockTaskRepository: TaskRepository = {
  save: jest.fn(),
  findOne: jest.fn(async ({ id, todoId }) => {
    const task = mockDb.tasks.find((task: Task) => task.id === id && task.todoId === todoId);
    return !!task ? new Task(task) : null;
  }),
  findMany: jest.fn(),
  remove: jest.fn(async ({ id }) => {
    mockDb.tasks = mockDb.tasks.filter((task: Task) => task.id !== id);
  }),
};

const removeTaskUsecase = new RemoveTaskUsecase(mockTaskRepository);

describe('Should be able to remove a task', () => {
  beforeEach(() => {
    mockDb = {
      todo: [
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
          description: 'Task 1 description',
          completed: false,
          todoId,
          createdAt: new Date(),
          updatedAt: null,
        },
      ],
    };
  });

  test('Should be able to remove an existing task', async () => {
    const input: RemoveTaskUsecase.Input = {
      todoId,
      taskId,
    };

    await removeTaskUsecase.execute(input);

    expect(mockDb.tasks).toHaveLength(0);
  });

  test('Should not be able to remove a non-existing task', async () => {
    const input: RemoveTaskUsecase.Input = {
      todoId,
      taskId: 'non-existing-id',
    };

    const taskRemovedError = (await removeTaskUsecase.execute(input)).error;

    expect(taskRemovedError).toBeInstanceOf(NotFoundError);
  });
});
