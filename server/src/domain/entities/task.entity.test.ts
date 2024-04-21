import { UnprocessableEntityError } from '../../utils/app-error';
import { Task } from './task.entity';

const todoId = '92f55b56-e071-458e-b321-8179e851854a';

describe('Task entity', () => {
  test('Should be able to create a new task', async () => {
    const task = Task.create({
      title: 'Task 1',
      description: 'Task 1 description',
      todoId,
    }).value;

    expect(task).toBeTruthy();
    expect(task.id).toBeTruthy();
    expect(task.title).toBe('Task 1');
    expect(task.description).toBe('Task 1 description');
    expect(task.createdAt).toBeTruthy();
    expect(task.updatedAt).toBeNull();
  });

  test('Should not be able to create a new task with invalid data', async () => {
    const task = Task.create({
      title: '',
      description: 'Task 1 description',
      todoId,
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

  test('Should be able to update a task', async () => {
    const task = Task.create({
      title: 'Task 1',
      description: 'Task 1 description',
      todoId,
    }).value;
    const taskUpdated = task.update({
      title: 'Task 1 updated',
      description: 'Task 1 updated description',
    }).value;

    expect(taskUpdated).toBeInstanceOf(Task);
    expect(taskUpdated.id).toEqual(task.id);
    expect(taskUpdated.title).toBe('Task 1 updated');
    expect(taskUpdated.description).toBe('Task 1 updated description');
    expect(taskUpdated.updatedAt).toBeTruthy();
  });

  test('Should not be able to update a task with invalid data', async () => {
    const task = Task.create({
      title: 'Task 1',
      description: 'Task 1 description',
      todoId,
    }).value;
    const taskUpdated = task.update({
      title: '',
      description: 'Task 1 updated description',
    }).error;

    expect(taskUpdated).toBeInstanceOf(UnprocessableEntityError);
    expect(taskUpdated.message).toBe('Invalid task data');
    expect(taskUpdated.details).toEqual([
      {
        field: 'title',
        message: "Task title can't be empty",
      },
    ]);
  });
});
