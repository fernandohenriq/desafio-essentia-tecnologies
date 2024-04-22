import { randomUUID } from 'crypto';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { z } from 'zod';

import { UnprocessableEntityError } from '../../utils/app-error';
import { Result } from '../../utils/result';

const createTodoSchema = z.object({
  title: z
    .string({
      invalid_type_error: 'Todo title must be a string',
      required_error: 'Todo title is required',
    })
    .min(1, "Todo title can't be empty")
    .max(50, "Todo title can't be longer than 50 characters"),
});

const UpdateTodoSchema = createTodoSchema.partial();

export namespace Todo {
  export type CreateTodoProps = z.infer<typeof createTodoSchema> & {};
  export type UpdateTodoProps = z.infer<typeof UpdateTodoSchema> & {};
}

@Entity('todos')
export class Todo {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('datetime')
  createdAt: Date;

  @Column('datetime', { nullable: true })
  updatedAt?: Date | null;

  constructor(props: PropsOf<Todo>) {
    Object.assign(this, props);
  }

  update(props: Todo.UpdateTodoProps): Result<Todo, UnprocessableEntityError> {
    const result = UpdateTodoSchema.safeParse(props);
    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return Result.failure(new UnprocessableEntityError('Invalid todo data', errors));
    }
    const data = result.data;
    return Result.success(
      new Todo({
        id: this.id,
        title: data.title ?? this.title,
        createdAt: this.createdAt,
        updatedAt: new Date(),
      }),
    );
  }

  static create(props: Todo.CreateTodoProps): Result<Todo, UnprocessableEntityError> {
    const result = createTodoSchema.safeParse(props);
    if (!result.success) {
      const errors = result.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return Result.failure(new UnprocessableEntityError('Invalid todo data', errors));
    }
    const data = result.data;
    return Result.success(
      new Todo({
        id: randomUUID(),
        title: data.title,
        createdAt: new Date(),
        updatedAt: null,
      }),
    );
  }
}
