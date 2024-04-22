import { Todo } from '../entities/todo.entity';
import { DefaultRepository } from './default.repository';

export interface TodoRepository extends DefaultRepository<Todo> {}
