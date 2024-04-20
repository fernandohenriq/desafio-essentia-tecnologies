import { randomUUID } from 'crypto';
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { z } from 'zod';

import { UnprocessableEntityError } from '../../utils/app-error';
import { Result } from '../../utils/result';
import { Task } from './task.entity';

const createTodoSchema = z.object({
  title: z.string().min(1, "Todo title can't be empty"),
});

export type CreateTodoProps = z.infer<typeof createTodoSchema> & {};

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

  @OneToMany((Type) => Task, (task) => task.todo, { onDelete: 'CASCADE' })
  @JoinColumn()
  tasks: Task[];

  constructor(props: PropsOf<Todo>) {
    Object.assign(this, props);
  }

  static create(
    props: Omit<PropsOf<Todo>, 'id' | 'createdAt' | 'updatedAt' | 'tasks'>,
  ): Result<Todo, UnprocessableEntityError> {
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
        tasks: [],
      }),
    );
  }
}
