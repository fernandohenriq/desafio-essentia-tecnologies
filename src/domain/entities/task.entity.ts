import { randomUUID } from 'crypto';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { z } from 'zod';

import { UnprocessableEntityError } from '../../utils/app-error';
import { Result } from '../../utils/result';
import { Todo } from './todo.entity';

const createTodoSchema = z.object({
  title: z
    .string({
      invalid_type_error: 'Task title must be a string',
      required_error: 'Task title is required',
    })
    .min(1, "Task title can't be empty")
    .max(50, "Task title can't be longer than 50 characters"),
  description: z
    .string({
      invalid_type_error: 'Task description must be a string',
    })
    .min(1, "Task description can't be empty")
    .max(150, "Task description can't be longer than 150 characters"),
  completed: z
    .boolean({
      invalid_type_error: 'Task completed field must be a boolean',
    })
    .optional(),
  todoId: z
    .string({
      invalid_type_error: 'Task todoId must be a string',
      required_error: 'Task todoId is required',
    })
    .uuid({ message: 'Invalid todoId' }),
});

const UpdateTodoSchema = createTodoSchema.omit({ todoId: true }).partial();

export namespace Task {
  export type CreateTaskProps = z.infer<typeof createTodoSchema> & {
    todo?: Todo;
  };
  export type UpdateTaskProps = z.infer<typeof UpdateTodoSchema>;
}

@Entity('tasks')
export class Task {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('boolean')
  completed: boolean;

  @Column('text')
  todoId: string;

  @Column('text')
  createdAt: Date;

  @Column('datetime', { nullable: true })
  updatedAt: Date | null;

  @ManyToOne((type) => Todo, (todo) => todo.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'todoId' })
  todo?: Todo;

  constructor(props: PropsOf<Task>) {
    Object.assign(this, props);
  }

  update(props: Task.UpdateTaskProps): Result<Task, UnprocessableEntityError> {
    const result = UpdateTodoSchema.safeParse(props);
    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return Result.failure(new UnprocessableEntityError('Invalid task data', errors));
    }
    const data = result.data;
    return Result.success(
      new Task({
        id: this.id,
        title: data.title ?? this.title,
        description: data.description ?? this.description,
        completed: data.completed ?? this.completed,
        todoId: this.todoId,
        createdAt: this.createdAt,
        updatedAt: new Date(),
      }),
    );
  }

  static create(props: Task.CreateTaskProps): Result<Task, UnprocessableEntityError> {
    const result = createTodoSchema.safeParse(props);
    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return Result.failure(new UnprocessableEntityError('Invalid task data', errors));
    }
    const data = result.data;
    return Result.success(
      new Task({
        id: randomUUID(),
        title: data.title,
        description: data.description,
        completed: data.completed ?? false,
        todoId: data.todoId,
        createdAt: new Date(),
        updatedAt: null,
        todo: props.todo,
      }),
    );
  }
}
