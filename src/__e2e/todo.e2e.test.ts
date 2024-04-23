import supertest from 'supertest';

import { ExpressApp } from '../presentation/express-app';

const app = new ExpressApp();

const client = supertest(app.server);

let createdTodoId: string;

describe('Todo E2E', () => {
  beforeAll(async () => {
    await app.initialize();
  });

  afterAll(async () => {
    await app.close();
  });

  test('POST /', async () => {
    const response = await client.options('/').send();

    expect(response.status).toBe(200);
  });

  test('POST /todos', async () => {
    const response = await client.post('/todos').send({
      title: 'Todo 1',
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: 'Todo created successfully',
      data: expect.objectContaining({
        id: expect.any(String),
        title: 'Todo 1',
        isCompleted: false,
        createdAt: expect.any(String),
        updatedAt: null,
      }),
    });

    createdTodoId = response.body.data.id;
  });

  describe('GET /todos', () => {
    test('/', async () => {
      const response = await client.get('/todos');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Todos found successfully',
        data: expect.arrayContaining([
          expect.objectContaining({
            id: createdTodoId,
            title: 'Todo 1',
            isCompleted: false,
            createdAt: expect.any(String),
            updatedAt: null,
          }),
        ]),
      });
    });

    test('/?title=Todo 1', async () => {
      const response = await client.get('/todos?title=Todo 1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Todos found successfully',
        data: expect.arrayContaining([
          expect.objectContaining({
            id: createdTodoId,
            title: 'Todo 1',
            isCompleted: false,
            createdAt: expect.any(String),
            updatedAt: null,
          }),
        ]),
      });
    });

    test('/?title=Todo 123', async () => {
      const response = await client.get('/todos?title=Todo 123');

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Todos found successfully');
      expect(response.body.data.length).toBe(0);
    });

    test('/?page=1&limit=10', async () => {
      const response = await client.get('/todos?page=1&limit=10');

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Todos found successfully');
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    test('/todos?page=2&limit=10', async () => {
      const response = await client.get('/todos?page=2&limit=10');

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Todos found successfully');
      expect(response.body.data.length).toBe(0);
    });
  });

  test('GET /todos/:id', async () => {
    const response = await client.get(`/todos/${createdTodoId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Todo found successfully',
      data: expect.objectContaining({
        id: createdTodoId,
        title: 'Todo 1',
        isCompleted: false,
        createdAt: expect.any(String),
        updatedAt: null,
      }),
    });
  });

  test('PATCH /todos/:id', async () => {
    const response = await client.patch(`/todos/${createdTodoId}`).send({
      title: 'Todo 1 updated',
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Todo updated successfully',
      data: expect.objectContaining({
        id: createdTodoId,
        title: 'Todo 1 updated',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    });
  });

  test('DELETE /todos/:id', async () => {
    const response = await client.delete(`/todos/${createdTodoId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Todo removed successfully',
    });

    const response2 = await client.get(`/todos/${createdTodoId}`);
    expect(response2.status).toBe(404);
  });
});
