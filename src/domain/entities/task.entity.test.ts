import { UnprocessableEntityError } from '../../utils/app-error';
import { Task } from './task.entity';

describe('Task entity', () => {
  test('Should be able to create a new task', async () => {
    const task = Task.create({
      title: 'Task 1',
      description: 'Task 1 description',
      todoId: 'ad2e9529-80a5-4d29-a7e7-12f7297957e1',
    }).value;

    expect(task).toBeTruthy();
    expect(task.id).toBeTruthy();
    expect(task.title).toBe('Task 1');
    expect(task.createdAt).toBeTruthy();
    expect(task.updatedAt).toBeNull();
  });

  test('Should not be able to create a new task with invalid data', async () => {
    const task = Task.create({
      title: '',
      description: 'Task 1 description',
      todoId: 'ad2e9529-80a5-4d29-a7e7-12f7297957e1',
    }).error;

    expect(task).toBeInstanceOf(UnprocessableEntityError);
    expect(task.message).toBe('Invalid task data');
    expect(task.details).toEqual([
      {
        field: 'title',
        message: "Task title can't be empty",
      },
    ]);
  });
});
