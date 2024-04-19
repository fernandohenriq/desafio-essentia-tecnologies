import { randomUUID } from 'crypto';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { z } from 'zod';

import { UnprocessableEntityError } from '../../utils/app-error';
import { Result } from '../../utils/result';

const createTodoSchema = z.object({
  title: z
    .string({
      invalid_type_error: 'Task title must be a string',
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
});

export type CreateTodoProps = z.infer<typeof createTodoSchema> & {};

@Entity('tasks')
export class Task {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  completed: boolean;

  @Column('text')
  createdAt: Date;

  @Column('datetime', { nullable: true })
  updatedAt: Date | null;

  constructor(props: PartialOf<PropsOf<Task>, 'id' | 'completed' | 'createdAt' | 'updatedAt'>) {
    Object.assign(this, props);
  }

  static create(props: CreateTodoProps): Result<Task, UnprocessableEntityError> {
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
        createdAt: new Date(),
        updatedAt: null,
      }),
    );
  }
}
