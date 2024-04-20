import { Task } from '../../domain/entities/task.entity';
import { TaskRepository } from '../../domain/repositories/task.repository';
import { NotFoundError, UnprocessableEntityError } from '../../utils/app-error';
import { EditTaskUsecase } from './edit-task.usecase';

const taskId = 'ad2e9529-80a5-4d29-a7e7-12f7297957e1';
const todoId = '92f55b56-e071-458e-b321-8179e851854a';

let mockDb: Record<string, any> = {};

const mockTaskRepository: TaskRepository = {
  save: jest.fn(async (task: Task) => {
    mockDb.tasks.push(task);
    return task;
  }),
  findOne: jest.fn(async ({ id, todoId }) => {
    const task = mockDb.tasks.find((task: Task) => task.id === id && task.todoId === todoId);
    return !!task ? new Task(task) : null;
  }),
  findMany: jest.fn(),
  remove: jest.fn(),
};

const editTaskUsecase = new EditTaskUsecase(mockTaskRepository);

describe('EditTaskUsecase', () => {
  beforeEach(() => {
    mockDb = {
      tasks: [
        {
          id: taskId,
          todoId,
          title: 'Task 1',
          description: 'Task 1 description',
          completed: false,
          createdAt: new Date(),
          updatedAt: null,
        },
      ],
    };
  });

  test('Should be able to edit a existing task', async () => {
    const input: EditTaskUsecase.Input = {
      todoId,
      taskId,
      data: {
        title: 'Task 1 updated',
        description: 'Task 1 updated description',
      },
    };

    const taskUpdated = (await editTaskUsecase.execute(input)).value;

    expect(taskUpdated).toBeInstanceOf(Task);
    expect(taskUpdated.id).toEqual(taskId);
    expect(taskUpdated.title).toBe('Task 1 updated');
    expect(taskUpdated.description).toBe('Task 1 updated description');
    expect(taskUpdated.updatedAt).toBeTruthy();
  });

  test('Should not be able to edit a non-existing task id', async () => {
    const input: EditTaskUsecase.Input = {
      todoId,
      taskId: 'non-existing-task-id',
      data: {
        title: 'Task 1 updated',
        description: 'Task 1 updated description',
      },
    };

    const taskUpdatedError = (await editTaskUsecase.execute(input)).error;

    expect(taskUpdatedError).toBeInstanceOf(NotFoundError);
    expect(taskUpdatedError.message).toBe('Task not found');
  });

  test('Should not be able to edit a non-existing todo id', async () => {
    const input: EditTaskUsecase.Input = {
      todoId: 'non-existing-todo-id',
      taskId,
      data: {
        title: 'Task 1 updated',
        description: 'Task 1 updated description',
      },
    };

    const taskUpdatedError = (await editTaskUsecase.execute(input)).error;

    expect(taskUpdatedError).toBeInstanceOf(NotFoundError);
    expect(taskUpdatedError.message).toBe('Task not found');
  });

  test('Should not be able to edit a task with invalid data', async () => {
    const input: EditTaskUsecase.Input = {
      todoId,
      taskId,
      data: {
        title: '',
        description: 'Task 1 updated description',
      },
    };

    const taskUpdatedError = (await editTaskUsecase.execute(input)).error;

    expect(taskUpdatedError).toBeInstanceOf(UnprocessableEntityError);
  });
});
