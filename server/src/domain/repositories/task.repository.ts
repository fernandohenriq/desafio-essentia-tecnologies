import { Task } from '../entities/task.entity';
import { DefaultRepository } from './default.repository';

export interface TaskRepository extends DefaultRepository<Task> {}
