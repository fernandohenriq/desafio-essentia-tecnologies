import { Todo } from '../entities/todo.entity';

export interface TodoRepository {
  save(entity: Todo): Promise<Todo>;
  findById(id: string): Promise<Todo | null>;
}
