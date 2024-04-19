import { UnprocessableEntityError } from '../../utils/app-error';
import { Todo } from './todo.entity';

describe('Todo entity', () => {
  test('Should be able to create a new todo', async () => {
    const todo = Todo.create({ title: 'Todo 1' }).value;

    expect(todo).toBeTruthy();
    expect(todo.id).toBeTruthy();
    expect(todo.title).toBe('Todo 1');
    expect(todo.createdAt).toBeTruthy();
    expect(todo.updatedAt).toBeNull();
  });

  test('Should not be able to create a new todo with invalid data', async () => {
    const todo = Todo.create({ title: '' }).error;

    expect(todo).toBeInstanceOf(UnprocessableEntityError);
    expect(todo.message).toBe('Invalid todo data');
    expect(todo.details).toEqual([
      {
        field: 'title',
        message: "Todo title can't be empty",
      },
    ]);
  });
});
