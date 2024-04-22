import { UnprocessableEntityError } from '../../utils/app-error';
import { Todo } from './todo.entity';

describe('Todo entity', () => {
  test('Should be able to create a new todo', async () => {
    const todo = Todo.create({ title: 'Todo 1' }).value;

    expect(todo).toBeTruthy();
    expect(todo.id).toBeTruthy();
    expect(todo.title).toBe('Todo 1');
    expect(todo.isCompleted).toBe(false);
    expect(todo.createdAt).toBeTruthy();
    expect(todo.updatedAt).toBeNull();
  });

  test('Should not be able to create a new todo with invalid data', async () => {
    const error = Todo.create({ title: '' }).error;

    expect(error).toBeInstanceOf(UnprocessableEntityError);
    expect(error.message).toBe('Invalid todo data');
    expect(error.details).toEqual([
      {
        field: 'title',
        message: "Todo title can't be empty",
      },
    ]);
  });

  test('Should be able to update a todo', async () => {
    const todo = Todo.create({ title: 'Todo 1' }).value;

    const todoUpdated = todo.update({
      title: 'Todo 1 updated',
      isCompleted: true,
    }).value;

    expect(todoUpdated).toBeInstanceOf(Todo);
    expect(todoUpdated.id).toEqual(todo.id);
    expect(todoUpdated.title).toBe('Todo 1 updated');
    expect(todoUpdated.isCompleted).toBe(true);
    expect(todoUpdated.createdAt).toBeTruthy();
    expect(todoUpdated.updatedAt).toBeTruthy();
  });

  test('Should not be able to update a todo with invalid data', async () => {
    const todo = Todo.create({ title: 'Todo 1' }).value;
    const error = todo.update({ title: '', isCompleted: true }).error;

    expect(error).toBeInstanceOf(UnprocessableEntityError);
    expect(error.message).toBe('Invalid todo data');
    expect(error.details).toEqual([
      {
        field: 'title',
        message: "Todo title can't be empty",
      },
    ]);
  });
});
