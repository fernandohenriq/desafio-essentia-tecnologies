import supertest from 'supertest';

import { ExpressApp } from '../presentation/express-app';

const app = new ExpressApp();

const client = supertest(app.server);

let testTodoId: string = '11111111-1111-1111-1111-111111111111';
let testTaskId: string;

describe('Task E2E', () => {
  beforeAll(async () => {
    await app.initialize();
    await app.seed({
      todos: [
        {
          id: testTodoId,
          title: 'Todo 1',
          createdAt: new Date(),
          updatedAt: null,
        },
      ],
    });
  });

  afterAll(async () => {
    await app.close();
  });

  test('POST /todos/:todoId/tasks', async () => {
    const response = await client.post(`/todos/${testTodoId}/tasks`).send({
      title: 'Task 1',
      description: 'Task 1 description',
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toEqual('Task created successfully');
    expect(response.body.task).toEqual({
      id: expect.any(String),
      title: 'Task 1',
      description: 'Task 1 description',
      completed: false,
      todoId: testTodoId,
      createdAt: expect.any(String),
      updatedAt: null,
    });

    testTaskId = response.body.task.id;
  });

  describe('GET /todos/:todoId/tasks', () => {
    test('/', async () => {
      const response = await client.get(`/todos/${testTodoId}/tasks`);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Tasks found successfully');
      expect(response.body.tasks).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: testTaskId,
            title: 'Task 1',
            description: 'Task 1 description',
            completed: false,
            todoId: testTodoId,
            createdAt: expect.any(String),
            updatedAt: null,
          }),
        ]),
      );
    });

    test('/?title=Task 1', async () => {
      const response = await client.get(`/todos/${testTodoId}/tasks?title=Task 1`);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Tasks found successfully');
      expect(response.body.tasks).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: testTaskId,
          }),
        ]),
      );
    });

    test('/?title=Task 123', async () => {
      const response = await client.get(`/todos/${testTodoId}/tasks?title=Task 123`);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Tasks found successfully');
      expect(response.body.tasks.length).toBe(0);
    });

    test('/?where={"completed"=false}', async () => {
      const response = await client.get(`/todos/${testTodoId}/tasks?where={"completed"=false}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Tasks found successfully');
      expect(response.body.tasks).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: testTaskId,
          }),
        ]),
      );
    });

    test('/?page=2&limit=10', async () => {
      const response = await client.get(`/todos/${testTodoId}/tasks?page=1&limit=10`);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Tasks found successfully');
      expect(response.body.tasks.length).toBeGreaterThan(0);
    });

    test('/?page=2&limit=10', async () => {
      const response = await client.get(`/todos/${testTodoId}/tasks?page=2&limit=10`);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Tasks found successfully');
      expect(response.body.tasks.length).toBe(0);
    });
  });

  test('GET /todos/:todoId/tasks/:taskId', async () => {
    const response = await client.get(`/todos/${testTodoId}/tasks/${testTaskId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Task found successfully');
    expect(response.body.task).toEqual({
      id: testTaskId,
      title: 'Task 1',
      description: 'Task 1 description',
      completed: false,
      todoId: testTodoId,
      createdAt: expect.any(String),
      updatedAt: null,
    });
  });

  test('PATCH /todos/:todoId/tasks/:taskId', async () => {
    const response = await client.patch(`/todos/${testTodoId}/tasks/${testTaskId}`).send({
      completed: true,
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Task updated successfully');
    expect(response.body.task).toEqual({
      id: testTaskId,
      title: 'Task 1',
      description: 'Task 1 description',
      completed: true,
      todoId: testTodoId,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test('DELETE /todos/:todoId/tasks/:taskId', async () => {
    const response = await client.delete(`/todos/${testTodoId}/tasks/${testTaskId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Task removed successfully');
  });
});
