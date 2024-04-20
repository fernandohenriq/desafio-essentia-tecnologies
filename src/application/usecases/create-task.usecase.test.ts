import { Task } from '../../domain/entities/task.entity';
import { TaskRepository } from '../../domain/repositories/task.repository';
import { UnprocessableEntityError } from '../../utils/app-error';
import { CreateTaskUseCase } from './create-task.usecase';

const mockTaskRepository: TaskRepository = {
  save: jest.fn(async (task: Task) => task),
  findOne: jest.fn(),
  findMany: jest.fn(),
  remove: jest.fn(),
};

const createTaskUsecase = new CreateTaskUseCase(mockTaskRepository);

describe('CreateTaskUsecase', () => {
  test('Should be able to create a new task', async () => {
    const input: CreateTaskUseCase.Input = {
      title: 'Task 1',
      description: 'Task 1 description',
      todoId: 'ad2e9529-80a5-4d29-a7e7-12f7297957e1',
    };

    const taskCreated = (await createTaskUsecase.execute(input)).value;

    expect(taskCreated).toBeInstanceOf(Task);
    expect(taskCreated.id).toEqual(expect.any(String));
    expect(taskCreated.title).toBe('Task 1');
    expect(taskCreated.createdAt).toBeInstanceOf(Date);
    expect(taskCreated.updatedAt).toBeNull();
  });

  test('Should not be able to create a new task with invalid data', async () => {
    const input: CreateTaskUseCase.Input = {
      title: '',
      description: 'Task 1 description',
      todoId: 'ad2e9529-80a5-4d29-a7e7-12f7297957e1',
    };

    const taskCreatedError = (await createTaskUsecase.execute(input)).error;

    expect(taskCreatedError).toBeInstanceOf(UnprocessableEntityError);
  });
});
