import { Task } from '../../domain/entities/task.entity';
import { TaskRepository } from '../../domain/repositories/task.repository';
import { FindManyTasksUsecase } from './find-many-tasks.usecase';

let mockDb: Record<string, any> = {};

const mockTaskRepository: TaskRepository = {
  save: jest.fn(),
  findOne: jest.fn(),
  findMany: jest.fn(async (search: Search<Task>) => {
    const { page = 1, limit = 10, where = {} } = search ?? {};
    const tasks = mockDb.tasks
      .filter((task: Task) => Object.entries(where).every(([key, value]) => task[key] === value))
      .slice((page - 1) * limit, page * limit);
    return tasks.map((task: any) => new Task(task));
  }),
  remove: jest.fn(),
};

const findOneTaskUsecase = new FindManyTasksUsecase(mockTaskRepository);

describe('FindManyTasksUsecase', () => {
  beforeEach(() => {
    mockDb = {
      tasks: [
        {
          id: '92f55b56-e071-458e-b321-8179e851854a',
          title: 'Task 1',
          description: 'Task 1 description',
          completed: false,
          createdAt: new Date(),
          updatedAt: null,
        },
        {
          id: '92f55b56-e071-458e-b321-8179e851854b',
          title: 'Task 2',
          description: 'Task 2 description',
          completed: false,
          createdAt: new Date(),
          updatedAt: null,
        },
      ],
    };
  });

  test('Should be able to find many tasks', async () => {
    const tasks = (await findOneTaskUsecase.execute({ page: 1, limit: 10 })).value;

    expect(tasks).toHaveLength(2);
    expect(tasks[0]).toBeInstanceOf(Task);
    expect(tasks[1]).toBeInstanceOf(Task);

    expect((await findOneTaskUsecase.execute({ page: 2, limit: 2 })).value).toHaveLength(0);
    expect((await findOneTaskUsecase.execute({ page: 1, limit: 2 })).value).toHaveLength(2);
    expect(
      (await findOneTaskUsecase.execute({ where: { title: 'non-existing' } })).value,
    ).toHaveLength(0);
  });
});
